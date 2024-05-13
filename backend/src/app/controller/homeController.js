const session = require('express-session');
const userSchema = require('../models/User');
const mongooseToObject = require('../../util/mongoose')
const Room = require('../models/Room'); 
const semaphore = require('../../semaphore');
let full = "";
let Notfound = "";
// const socket = _io();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
function generateRoomId() {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}
class homeController{
    index(req, res) {
        if (req.session.isAuth) {
            userSchema.findOne({_id: req.params.userId})
                .then((result) => {
                    res.render('home', {username: result.username, userId: req.params.userId, full: full, Notfound: Notfound})
                    full = "";
                    Notfound = "";
                })
                .catch(err => {
                    console.log('Error: ', err);
                    res.json({
                        status: "Failed",
                        message: "Lỗi xảy ra khi lay thong tin nguoi dung"
                    })
                })
        } else {
            res.redirect('/login');
        }
    }

    del(req, res, next) {
        req.session
            .destroy((err) => {
                if (err) {
                    console.log("err: ",err);
                    res.json({
                        status:"Failed",
                        message: "Lỗi xảy ra khi đăng xuất"
                    })
                }
                res.redirect('/login');
            })
    }
    update(req, res, next) {
        res.render('home')
    }

    create(req,res){
        const {roomID} = req.params;
        console.log("room: ",roomID);
        req.session.roomid = roomID; 
        const newRoom = new Room({
            roomid: roomID,
            vacant: true,
            count: 0,
            player: [{userid: req.session.user._id, username: req.session.user.username , win: false, score: 0}]
        });
        console.log(newRoom.roomid);
        newRoom.save();
        res.redirect('/playmulti/' + newRoom.roomid);


        // Xử lý khi người dùng ngắt kết nối
        // socket.on('disconnect', async () => {
        //     console.log('User disconnected');
        //     // Cập nhật trạng thái phòng và người chơi trong cơ sở dữ liệu khi cần
        // });
        // });
        
    }
    playnow(req, res) {
        Room.aggregate([{ $match: { vacant: true } }])
        .exec()
        .then((Room1) =>{
            console.log(Room1);
            if (Room1[0]) {
                Room1[0].vacant = false;
                Room
                    .updateOne({roomid: Room1[0].roomid}, {vacant: false})
                    .then(() => {
                        console.log(`Phòng ${Room1[0].roomid} trống. Đang vào phòng...`);
            
                        Room1[0].player.push({
                            userid: req.session.user._id,
                            username: req.session.user.username,
                            win: false,
                            score: 0
                        });
                
                        Room
                            .updateOne({_id: Room1[0]._id},{player: Room1[0].player })
                            .then(() => {
                                res.redirect('/playmulti/' + Room1[0].roomid);
                            })
                            .catch(err => {
                                console.log('error: ', err)
                            })
                        
                    })
                    .catch(err => {
                        console.log('error: ', err)
                    })

            } 
            else {
                let roomID = generateRoomId().toString();
                
                const newRoom = new Room({
                    roomid: roomID,
                    vacant: true,
                    count: 0,
                    player: [{ userid: req.session.user._id, username: req.session.user.username, win: false, score: 0 }]
                });
            
                newRoom.save();
            
                res.redirect('/playmulti/' + newRoom.roomid);
            }
        })
        .catch((error) => {
            res.send("Không thể truy cập phòng.");
            console.log("Error: ",error);
        })
        
    }
    searchroom(req,res){
        let search = req.body.roomID;
        console.log("Search: ", search);
        Room
            .findOne({roomid: search})
            .then((room_vacant)=>{
                if (room_vacant.vacant)
                {
                    Room.aggregate([{ $match: { vacant: true } }])
                    .exec()
                    .then((Room1) =>{
                        if (Room1[0]) {
                            Room1[0].vacant = false;
                            Room
                                .updateOne({roomid: Room1[0].roomid}, {vacant: false})
                                .then(() => {
                                    console.log(`Phòng ${Room1[0].roomid} trống. Đang vào phòng...`);
                        
                                    Room1[0].player.push({
                                        userid: req.session.user._id,
                                        username: req.session.user.username,
                                        win: false,
                                        score: 0
                                    });
                            
                                    Room
                                        .updateOne({_id: Room1[0]._id},{player: Room1[0].player })
                                        .then(() => {
                                            res.redirect('/playmulti/' + Room1[0].roomid);
                                        })
                                        .catch(err => {
                                            console.log('error: ', err)
                                        })
                                    
                                })
                                .catch(err => {
                                    console.log('error: ', err)
                                })

                        } 
                    })
                    .catch((error) => {
                        res.send("Không thể truy cập phòng.");
                    })
                }
                else
                {
                    // res.send("Phòng đã đầy");
                    console.log("room đầy");
                    full = "Phòng đã đầy";
                    res.redirect("/home/" + req.session.user._id);
                }
            })
            .catch(err => {
                //res.send("Không thể tìm thấy phòng");
                Notfound = "Không thể tìm thấy phòng";
                console.log("room không tồn tại");
                res.redirect("/home/" + req.session.user._id);
            })
    }
    // playnow(req,res){
    //     // Kiểm tra từng phòng
    //     //const rooms = Room.find().lean();

    //     const Room1 = Room.findOne({ vacant: true });
    //     if (Room1) {
    //         Room1.vacant = false;
    //         Room1.save();
    //             console.log(`Phòng ${Room.roomid} trống. Đang vào phòng...`);
    //                 // Thực hiện hành động khi có phòng trống
    //                 // Ví dụ: Gọi hàm vào phòng
    //                 //socket.join(room.roomid);
    //         //     // Thêm người chơi vào phòng trong cơ sở dữ liệu
    //         Room1.player.push({userid: req.session.user._id, username: req.session.user.username , win: false, score: 0});
    //         Room1.save();
    //         res.redirect('/playmulti/' + Room1.roomid);
    //     }
    //     else{
    //         let roomID = generateRoomId().toString();
    //         // console.log(typeof roomID);
    //         const newRoom = new Room({
    //             roomid: roomID,
    //             vacant: true,
    //             player: [{userid: req.session.user._id, username: req.session.user.username , win: false, score: 0}]
    //         });
    //         newRoom.save();
    //         res.redirect('/playmulti/' + newRoom.roomid);
    //     }
            
        
    // }
}

module.exports = new homeController;