const songSchema = require('../models/Song');
const Room = require('../models/Room'); 
const User = require('../models/User');
const { io, app } = require('../../main');
let roomid = "";
let room = [];

let listSong = [];
let loadSong = true;
let playersdone = {};

const settingSchema = require('../models/Setting');


class Semaphore {
    constructor(initialCount) {
      this.count = initialCount;
      this.queue = [];
    }
  
    acquire() {
      return new Promise((resolve) => {
        if (this.count > 0) {
          this.count--;
          resolve();
        } else {
          this.queue.push(resolve);
        }
      });
    }
  
    release() {
      if (this.queue.length > 0) {
        const resolve = this.queue.shift();
        resolve();
      } else {
        this.count++;
      }
    }
}

const count = 0;

const sem = new Semaphore(1);
const sem1 = new Semaphore(1);
class playmultiController {
    async index(req, res) {
        console.log("count: ", count);
        await sem.acquire();
        roomid = req.params.roomid;
        console.log("roomid index: ", roomid)
        Room.findOne({roomid})
        .then((rooms) =>{
            room = rooms;
            console.log(room._id);
            if (rooms.vacant)
            {
                playersdone[roomid] = 0;
                songSchema.aggregate([
                    { $match: { mode: { $in: ["hard", "hell", "no hope"] } } },
                    { $sample: { size: 10} }
                    ])
                    .exec()
                    .then((songs) => {
                        listSong = songs;
                        const infolist = [];
                        for (let i = 0; i < songs.length; i++) {
                            infolist.push({name: songs[i].name, singer: songs[i].singer, link: songs[i].link});
                        }
                        loadSong = false;
                        settingSchema.findOne({email: req.session.user.email})
                        .then((st) => {
                            res.render('playmulti.hbs', {songs: JSON.stringify(songs), infolist, layout: false, username_player1: req.session.user.username, userid: req.session.user._id,  efVL: st.EffectVL, msVL: st.MusicVL, rom: room.roomid});
                        });
                    })
                    .catch(err => {
                        console.log('error: ', err)
                    })
            }
            
                
            else
            {
                if (loadSong){
                    songSchema.aggregate([
                        { $match: { mode: { $in: ["hard", "hell", "no hope"] } } },
                        { $sample: { size: 10} }
                        ])
                        .exec()
                        .then((songs) => {
                            listSong = songs;
                            const infolist = [];
                            for (let i = 0; i < songs.length; i++) {
                                infolist.push({name: songs[i].name, singer: songs[i].singer, link: songs[i].link});
                            }
                            loadSong = false;
                            settingSchema.findOne({email: req.session.user.email})
                            .then((st) => {
                                res.render('playmulti.hbs', {songs: JSON.stringify(songs), infolist, layout: false, username_player1: req.session.user.username, userid: req.session.user._id, efVL: st.EffectVL, msVL: st.MusicVL, rom: room.roomid});
                            });
                        })
                        .catch(err => {
                            console.log('error: ', err)
                        })
                }
                else {
                    let songs = listSong;
                    const infolist = [];
                    for (let i = 0; i < songs.length; i++) {
                        infolist.push({name: songs[i].name, singer: songs[i].singer, link: songs[i].link});
                    }
                    settingSchema.findOne({email: req.session.user.email})
                    .then((st) => {
                        res.render('playmulti.hbs', {songs: JSON.stringify(songs), infolist, layout: false , username_player1: req.session.user.username, userid: req.session.user._id, efVL: st.EffectVL, msVL: st.MusicVL, rom: room.roomid});
                        loadSong = true;
                    })
                }
                
                
            }
        })
        .catch((error) =>{
            console.log("Error: ", error);
        })
                
    }
    
}

io.on("connection", async function(socket) {
    console.log(`User connected id is ${socket.id}`);
    socket.join(roomid);
    room.socketid.push(socket.id);
    room.count++;
    Room
        .updateOne({roomid: roomid}, {count: room.count, socketid: room.socketid })
        .then(() =>{
            console.log(room.socketid);
            console.log(socket.adapter.rooms);
            if (room.vacant){
                socket.emit("player1",room);
                
                sem.release();
                console.log("Mở khóa cho socket");
            }
            else{
                if (room.count <= 2)
                {
                    const socketsInRoom = io.sockets.adapter.rooms.get(roomid);
                    if (socketsInRoom) {
                        // Lặp qua danh sách socket trong room
                        socketsInRoom.forEach((socketId) => {
                            const socket = io.sockets.sockets.get(socketId);
                            // Sử dụng socket tại đây
                            if(socketId === room.socketid[0]){
                                socket.emit("player1",room);
                                sem.release();
                            }
                            else{
                                socket.emit("player2",room);
                            }
                            console.log(`Socket ID: ${socketId}`);
                            
                        });
                    } else {
                        console.log(`Không có socket nào trong room "${roomName}"`);
                    }
                }
                else
                {
                    console.log("roomid: ",room.roomid);
                    io.in(room.roomid).emit("remain_players", room.player[0].username, room.player[1].username);
                    sem.release();
                }
                
            }
        })
        .catch(err => {
            console.log("error: ",err);
        })
    
    socket.on("addpointtooppent", function(score) {
        Room.findOne({socketid: socket.id})
            .then((send) => {
                console.log(`from ${socket.id} ${send.roomid}`);
                socket.to(send.roomid).emit("addpointtooppent",score);        
            })
            .catch((err) => {
                console.log("error",err);
            })
        
    })
    socket.on("done", ()=>{
        Room.findOne({socketid: socket.id})
            .then((send) => {
                console.log(playersdone[send.roomid]);
                playersdone[send.roomid]++;
                if (playersdone[send.roomid] == 2) {
                    io.in(send.roomid).emit('endgame');
                    playersdone[send.roomid] = 0;
                }      
            })
            .catch((error)=>{
                console.log("Error: ", error);
            })
        
    })
    socket.on("disconnect",() =>
    {
        console.log(`${socket.id} has disconnect!`);
        const newroom = room.socketid.filter(item => item != socket.id);
        Room.findOne({socketid: socket.id})
        .then((send) => {
            Room.updateOne({roomid: send.roomid},{$set: {socketid: newroom}})
                .then((result)=>{
                    room.socketid = newroom;
                    console.log(result);
                })
                .catch((error)=>{
                    console.log("error: ",error);
                })
        })
        .catch((error)=>{
            console.log("Error: ", error);
        })
    })
    socket.on("reconnect",()=>{
        console.log(socket.id);
    })
    socket.on("render_home", async (iduser)=>{
        await sem1.acquire();
        Room.findOne({socketid: socket.id})
            .then((send) => {
                console.log("id: ",iduser);
                const player = send.player.filter(item => item.userid != iduser);
                console.log(player);
                Room.updateOne({roomid: send.roomid},{$set: {player: player, vacant: true}})
                .then(() =>{
                    if ( player.length == 0 ) {
                        Room.deleteOne({roomid: send.roomid})
                        .then()
                        .catch((err) =>{
                            console.log("error: ",err);
                        })
                    }
                    sem1.release();
            })
            .catch((err)=>{
                console.log("Error: ", err);
            })        
        })
        .catch((err) => {
            console.log("error",err);
        })
    })
    socket.on("score_win", (score, iduser)=>{
        User.findOne({_id: iduser})
            .then((user_win)=>{
                const win = user_win.multiWinGames++;
                const round = user_win.multiGames++;
                user_win.CurExp += score/10;
                if (user_win.multiPoint <= 1000)
                {
                    user_win.multiPoint += score/10;
                }
                else if (user_win.multiPoint <= 2400 )
                {
                    user_win.multiPoint += parseInt(score/12);
                }
                else if (user_win.multiPoint <= 4000)
                {
                    user_win.multiPoint += parseInt(score/15);
                }
                else if (user_win.multiPoint <= 6000)
                {
                    user_win.multiPoint += parseInt(score/18);
                }
                else if (user_win.multiPoint <= 8000)
                {
                    user_win.multiPoint += parseInt(score/20);
                }
                else if (user_win.multiPoint <= 12000)
                {
                    user_win.multiPoint += parseInt(score/25);
                }
                else if (user_win.multiPoint > 12000)
                {
                    user_win.multiPoint += parseInt(score/30);
                }
                User.updateOne({_id: iduser}, {multiWinGames: win, multiGames: round, CurExp: user_win.CurExp, multiPoint: user_win.multiPoint})
                .then()
                .catch((error)=>{
                    console.log("Error: ", error);
                })
            })
            .catch((error)=>{
                console.log("Error: ", error);
            })

        })
    socket.on("score_lose", (score, iduser)=>{
        User.findOne({_id: iduser})
            .then((user_lose)=>{
                const round = user_lose.multiGames++;
                user_lose.CurExp += score/10;
                if (user_lose.multiPoint <= 1000 && user_lose.multiPoint > 0)
                {
                    user_lose.multiPoint -= parseInt(score/60);
                }
                else if (user_lose.multiPoint <= 2400 )
                {
                    user_lose.multiPoint -= parseInt(score/50);
                }
                else if (user_lose.multiPoint <= 4000)
                {
                    user_lose.multiPoint -= parseInt(score/30);
                }
                else if (user_lose.multiPoint <= 6000)
                {
                    user_lose.multiPoint -= parseInt(score/25);
                }
                else if (user_lose.multiPoint <= 8000)
                {
                    user_lose.multiPoint -= parseInt(score/20);
                }
                else if (user_lose.multiPoint <= 12000)
                {
                    user_lose.multiPoint -= parseInt(score/15);
                }
                else if (user_lose.multiPoint > 12000)
                {
                    user_lose.multiPoint -= parseInt(score/5);
                }
                User.updateOne({_id: iduser}, {multiGames: round, CurExp: user_lose.CurExp, multiPoint: user_lose.multiPoint})
                .then()
                .catch((error)=>{
                    console.log("Error: ", error);
                })
            })
            .catch((error)=>{
                console.log("Error: ", error);
            })

        })
    socket.on("score_draw", (score, iduser)=>{
        User.findOne({_id: iduser})
            .then((user_draw)=>{
                const round = user_draw.multiGames++;
                user_draw.CurExp += score/10;
                if (user_draw.multiPoint <= 1000)
                {
                    user_draw.multiPoint += parseInt(score/15);
                }
                else if (user_draw.multiPoint <= 2400 )
                {
                    user_draw.multiPoint += parseInt(score/18);
                }
                else if (user_draw.multiPoint <= 4000)
                {
                    user_draw.multiPoint += parseInt(score/20);
                }
                else if (user_draw.multiPoint <= 6000)
                {
                    user_draw.multiPoint += parseInt(score/25);
                }
                else if (user_draw.multiPoint <= 8000)
                {
                    user_draw.multiPoint += parseInt(score/30);
                }
                else if (user_draw.multiPoint <= 12000)
                {
                    user_draw.multiPoint += parseInt(score/40);
                }
                else if (user_draw.multiPoint > 12000)
                {
                    user_draw.multiPoint += parseInt(score/50);
                }
                User.updateOne({_id: iduser}, {multiGames: round, CurExp: user_draw.CurExp, multiPoint: user_draw.multiPoint})
                .then()
                .catch((error)=>{
                    console.log("Error: ", error);
                })
            })
            .catch((error)=>{
                console.log("Error: ", error);
            })

        })
})


module.exports = new playmultiController;