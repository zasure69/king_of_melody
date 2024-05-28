const session = require('express-session');
const userSchema = require('../models/User');
const userGoogleSchema = require('../models/UserGoogle');
const setting = require('../models/Setting');
const mongooseToObject = require('../../util/mongoose')
const Room = require('../models/Room'); 
const semaphore = require('../../semaphore');
const UserGoogle = require('../models/UserGoogle');
let full = "";
let Notfound = "";
let Notinputround = "";
let Notinputround1 = "";
let exceed_permitted_value = "";
let exceed_permitted_value1 = "";
let roomID_list = new Set();
function generateRoomId() {
    var room = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    while (roomID_list.has(room))
    {
      room = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    }
    roomID_list.add(room);
    return room;
}

class homeController{
    index(req, res) {
        if (req.session.isAuth) {
            let leaderboardQuery = [
                {
                    $unionWith: {
                        coll: 'usergoogles',
                        pipeline: [
                            {
                                $project: {
                                    _id: 1,
                                    username: 1,
                                    multiPoint: 1
                                }
                            },
                        ]
                    }
                },
                {
                    $sort: {
                        multiPoint: -1
                    }
                },
                {
                    $limit: 10
                }
            ];
    
            Promise.all([
                userSchema.aggregate(leaderboardQuery),
                req.session.type == 'google'
                    ? userGoogleSchema.findOne({ _id: req.session.passport.user })
                    : userSchema.findOne({ _id: req.session.user._id })
            ])
            .then(([leaderboard, result]) => {
                leaderboard = leaderboard.map((item, index) => {
                    if (item.multiPoint < 1000) {
                        item.rank = 'Đồng';
                    } else if (item.multiPoint < 2400) {
                        item.rank = 'Bạc';
                    } else if (item.multiPoint < 4000) {
                        item.rank = 'Vàng';
                    } else if (item.multiPoint < 6000) {
                        item.rank = 'Bạch Kim';
                    } else if (item.multiPoint < 8000) {
                        item.rank = 'Kim Cương';
                    } else if (item.multiPoint < 12000) {
                        item.rank = 'Lục Bảo';
                    } else {
                        item.rank = 'Ruby Đỏ';
                    }
                    item.index = index + 1;
                    return item;
                });
                let rank;
                console.log("type: ", req.session)
                if (req.session.type == 'google') {
                    rank = result.rank;
                } else {
                    if (result.multiPoint < 1000) {
                        rank = 'Đồng';
                    } else if (result.multiPoint < 2400) {
                        rank = 'Bạc';
                    } else if (result.multiPoint < 4000) {
                        rank = 'Vàng';
                    } else if (result.multiPoint < 6000) {
                        rank = 'Bạch Kim';
                    } else if (result.multiPoint < 8000) {
                        rank = 'Kim Cương';
                    } else if (result.multiPoint < 12000) {
                        rank = 'Lục Bảo';
                    } else {
                        rank = 'Ruby Đỏ';
                    }
                }

                res.render('home', {
                    username: result.username,
                    userId: result._id,
                    multipoint: result.multiPoint,
                    rank: rank,
                    full: full,
                    Notfound: Notfound,
                    exceed: exceed_permitted_value,
                    exceed1: exceed_permitted_value1,
                    input_round: Notinputround,
                    input_round1: Notinputround1,
                    leaderboard: leaderboard,
                })
                    full = "";
                    Notfound = "";
                    exceed_permitted_value = "";
                    exceed_permitted_value1 = "";
                    Notinputround = "";
                    Notinputround1 = "";
            })
            .catch((err) => {
                console.log('Error: ', err);
                res.json({
                    status: "Failed",
                    message: "Lỗi xảy ra khi lấy dữ liệu bảng xếp hạng"
                });
            });
        } else {
            res.redirect('/login');
        }
    }

    del(req, res, next) {
        req.session.isAuth = false;
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
        if (req.session.type == "google") {
            UserGoogle.findOne({ _id: req.session.passport.user })
                .then((user) => {
                    setting.updateOne({email: user.email}, req.body)
                    .then(() => {
                        res.redirect('/home');
                    })
                    .catch(next)
                })
        } else {
            setting.updateOne({email: req.session.user.email}, req.body)
            .then(() => {
                res.redirect('/home');
            })
            .catch(next)
        }
        
    }

    create(req,res){
        const {roomID} = req.params;
        const roundnumber = req.body.roundNumber;
        console.log("roundnumber: ", typeof roundnumber);
        if (roundnumber == "")
        {
            Notinputround = "Hãy nhập số vòng chơi!";
            res.redirect('/home');
        }
        else if (roundnumber <= 30)
        {
            console.log("room: ",roomID);
            req.session.roomid = roomID; 
            if (req.session.type == "google") {
                UserGoogle.findOne({ _id: req.session.passport.user })
                    .then((user) => {
                        const newRoom = new Room({
                            roomid: roomID,
                            vacant: true,
                            round: roundnumber,
                            count: 0,
                            player: [{userid: user._id, username: user.username}]
                        });
                        console.log(newRoom.roomid);
                        newRoom.save();
                        console.log("round: ", roundnumber);
                        res.redirect('/playmulti/' + newRoom.roomid + "/" + roundnumber);
                    })
                    .catch(err => {
                        console.log('Lỗi xảy ra ở dòng 201: ', err);
                    })
            } else {
                const newRoom = new Room({
                    roomid: roomID,
                    vacant: true,
                    round: roundnumber,
                    count: 0,
                    player: [{userid: req.session.user._id, username: req.session.user.username}]
                });
                console.log(newRoom.roomid);
                newRoom.save();
                console.log("round: ", roundnumber);
                res.redirect('/playmulti/' + newRoom.roomid + "/" + roundnumber);
            }
            
        }
        else if (roundnumber > 30)
        {
            exceed_permitted_value = "Giá trị nhập vào cao hơn 30";
            res.redirect('/home');
        }
        else
        {
            exceed_permitted_value = "Giá trị nhập vào phải là số";
            res.redirect('/home');
        }
    }
    playnow(req, res) {
        if (req.body.roundNumber1 == "")
        {
            Notinputround1 = "Hãy nhập số vòng chơi!";
            res.redirect('/home');
        }
        else if (req.body.roundNumber1 <= 30)
        {
            Room.aggregate([{ $match: { vacant: true, round : parseInt(req.body.roundNumber1)} }])
            .exec()
            .then((Room1) =>{
                console.log(Room1);
                const round1 = parseInt(req.body.roundNumber1);
                if (Room1[0]) {
                    Room1[0].vacant = false;
                    Room
                        .updateOne({roomid: Room1[0].roomid}, {vacant: false})
                        .then(() => {
                            console.log(`Phòng ${Room1[0].roomid} trống. Đang vào phòng...`);
                            if (req.session.type == "google") {
                                UserGoogle.findOne({ _id: req.session.passport.user })
                                    .then((user) => {
                                        Room1[0].player.push({
                                            userid: user._id,
                                            username: user.username,
                                        });               
                                        Room
                                            .updateOne({_id: Room1[0]._id},{player: Room1[0].player })
                                            .then(() => {
                                                res.redirect('/playmulti/' + Room1[0].roomid + "/" + Room1[0].round);
                                            })
                                            .catch(err => {
                                                console.log('error: ', err)
                                            })  
                                    })
                                    .catch((err) => {
                                        console.log('Lỗi xảy ra ở dòng 252: ', err)
                                    })
                            } else {
                                Room1[0].player.push({
                                    userid: req.session.user._id,
                                    username: req.session.user.username,
                                });               
                                Room
                                    .updateOne({_id: Room1[0]._id},{player: Room1[0].player })
                                    .then(() => {
                                        res.redirect('/playmulti/' + Room1[0].roomid + "/" + Room1[0].round);
                                    })
                                    .catch(err => {
                                        console.log('error: ', err)
                                    })  
                            }
                                                 
                        })
                        .catch(err => {
                            console.log('error: ', err)
                        })
                } 
                else {
                    let roomID = generateRoomId().toString();
                    if (req.session.type == "google") {
                        UserGoogle.findOne({ _id: req.session.passport.user })
                            .then((user) => {
                                const newRoom = new Room({
                                    roomid: roomID,
                                    vacant: true,
                                    round: round1,
                                    count: 0,
                                    player: [{userid: user._id, username: user.username}]
                                });
                                console.log(newRoom.roomid);
                                newRoom.save();
                                console.log("round: ", round1);
                                res.redirect('/playmulti/' + newRoom.roomid + "/" + round1);
                            })
                            .catch(err => {
                                console.log("Lỗi xảy ra ở dòng 284: ", err);
                            })
                    } else {
                        const newRoom = new Room({
                            roomid: roomID,
                            vacant: true,
                            round: round1,
                            count: 0,
                            player: [{userid: req.session.user._id, username: req.session.user.username}]
                        });
                        console.log(newRoom.roomid);
                        newRoom.save();
                        console.log("round: ", round1);
                        res.redirect('/playmulti/' + newRoom.roomid + "/" + round1);
                    }
                    
                    // let username = req.session.user.username;
                    
                    // const newRoom = new Room({
                    //     roomid: roomID,
                    //     vacant: true,
                    //     round: round1,
                    //     count: 0,
                    //     player: [{ userid: id, username: username}]
                    // });
                    // newRoom.save();
                    // res.redirect('/playmulti/' + newRoom.roomid + "/" + round1);
                }         
            })
            .catch((error) => {
                res.send("Không thể truy cập phòng.");
                console.log("Error: ",error);
            })
        }
        else if (req.body.roundNumber1 > 30)
        {
            exceed_permitted_value1 = "Giá trị nhập vào cao hơn 30";
            res.redirect('/home');
        }
        else
        {
            exceed_permitted_value1 = "Giá trị nhập vào phải là số";
            res.redirect('/home');
        }    
    }
    searchroom(req,res){
        let search = req.body.roomID.toString();
        console.log("Search: ", search);
        Room
            .findOne({roomid: search})
            .then((Room1)=>{
                console.log("Room1: ", Room1);
                if (Room1.vacant)
                {
                    Room1.vacant = false;
                    Room
                        .updateOne({roomid: Room1.roomid}, {vacant: false})
                        .then(() => {
                            console.log(`Phòng ${Room1.roomid} trống. Đang vào phòng...`);
                            if (req.session.type == "google") {
                                UserGoogle.findOne({ _id: req.session.passport.user })
                                    .then((user) => {
                                        Room1.player.push({
                                            userid: user._id,
                                            username: user.username,
                                        });
                                        Room
                                            .updateOne({_id: Room1._id},{player: Room1.player })
                                            .then(() => {
                                                res.redirect('/playmulti/' + Room1.roomid + "/" + Room1.round);
                                            })
                                            .catch(err => {
                                                console.log('error: ', err)
                                            })
                                    })
                                    .catch((err) => {
                                        console.log('Lỗi xảy ra ở dùng 303: ', err)
                                    })
                            } else {
                                Room1.player.push({
                                    userid: req.session.user._id,
                                    username: req.session.user.username,
                                });
                            }
                            
                    
                            Room
                                .updateOne({_id: Room1._id},{player: Room1.player })
                                .then(() => {
                                    res.redirect('/playmulti/' + Room1.roomid + "/" + Room1.round);
                                })
                                .catch(err => {
                                    console.log('error: ', err)
                                })
                        })
                        .catch(err => {
                            console.log('error: ', err)
                        })
                }
                else
                {
                    console.log("room đầy");
                    full = "Phòng đã đầy";
                    res.redirect("/home");
                }
            })
            .catch(err => {
                Notfound = "Không thể tìm thấy phòng";
                console.log("room không tồn tại ", err);
                res.redirect("/home");
            })
    }
}

module.exports = new homeController;
