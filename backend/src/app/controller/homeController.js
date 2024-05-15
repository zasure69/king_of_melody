const session = require('express-session');
const userSchema = require('../models/User');
const userGoogleSchema = require('../models/UserGoogle');
const setting = require('../models/Setting');
const mongooseToObject = require('../../util/mongoose')
const Room = require('../models/Room'); 
const semaphore = require('../../semaphore');
let full = "";
let Notfound = "";
function generateRoomId() {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

// class Semaphore {
//     constructor(initialCount) {
//       this.count = initialCount;
//       this.queue = [];
//     }
  
//     acquire() {
//       return new Promise((resolve) => {
//         if (this.count > 0) {
//           this.count--;
//           resolve();
//         } else {
//           this.queue.push(resolve);
//         }
//       });
//     }
  
//     release() {
//       if (this.queue.length > 0) {
//         const resolve = this.queue.shift();
//         resolve();
//       } else {
//         this.count++;
//       }
//     }
// }
// const sem = new Semaphore(1);
class homeController{
    index(req, res) {
        if (req.session.isAuth) {
            if (req.session.type == 'google') {
                console.log('đã vào đây')
                userGoogleSchema.findOne({_id: req.session.passport.user})
                .then((result) => {
                    res.render('home', {username: result.username, userId: result._id})
                })
                .catch(err => {
                    console.log('Error: ', err);
                    res.json({
                        status: "Failed",
                        message: "Lỗi xảy ra khi lay thong tin nguoi dung"
                    })
                })
            } else {
                userSchema.findOne({_id: req.session.user._id})
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
            }
            
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
        if (!req.body.IsSoundOn){
            req.body.IsSoundOn = "off";
            req.body.MusicVL = 0;
        } else req.body.MusicVL = req.body.MusicVL / 100
        if (!req.body.IsEffectOn){
            req.body.IsEffectOn = "off";
            req.body.EffectVL = 0;
        } else req.body.EffectVL = req.body.EffectVL / 100
        setting.updateOne({email: req.session.user.email}, req.body)
            .then(() => {
                res.render('home', {userId: req.session.user._id})
            })
            .catch(next)
    }

    create(req,res){
        const {roomID} = req.params;
        const roundnumber = req.body.roundNumber;
        console.log("room: ",roomID);
        req.session.roomid = roomID; 
        const newRoom = new Room({
            roomid: roomID,
            vacant: true,
            count: 0,
            player: [{userid: req.session.user._id, username: req.session.user.username}]
        });
        console.log(newRoom.roomid);
        newRoom.save();
        res.redirect('/playmulti/' + newRoom.roomid);
        
    }
    playnow(req, res) {
        //await sem.acquire();
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
                        });
                
                        Room
                            .updateOne({_id: Room1[0]._id},{player: Room1[0].player })
                            .then(() => {
                                res.redirect('/playmulti/' + Room1[0].roomid);
                               // sem.release();
                            })
                            .catch(err => {
                                console.log('error: ', err);
                                //sem.release();
                            })
                        
                    })
                    .catch(err => {
                        console.log('error: ', err);  
                    })
                //sem.release();
            } 
            else {
                let roomID = generateRoomId().toString();
                
                const newRoom = new Room({
                    roomid: roomID,
                    vacant: true,
                    count: 0,
                    player: [{ userid: req.session.user._id, username: req.session.user.username}]
                });
            
                newRoom.save();
            
                res.redirect('/playmulti/' + newRoom.roomid);
                // sem.release();
            }
        })
        .catch((error) => {
            res.send("Không thể truy cập phòng.");
            console.log("Error: ",error);
            sem.release();
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
                    console.log("room đầy");
                    full = "Phòng đã đầy";
                    res.redirect("/home/" + req.session.user._id);
                }
            })
            .catch(err => {
                Notfound = "Không thể tìm thấy phòng";
                console.log("room không tồn tại");
                res.redirect("/home/" + req.session.user._id);
            })
    }
}

module.exports = new homeController;