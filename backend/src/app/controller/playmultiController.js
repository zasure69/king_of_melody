const songSchema = require('../models/Song');
const Room = require('../models/Room'); 
//const semaphore = require('../../semaphore');
const { io, app } = require('../../main');
let roomid = "";
//let room_ID = [];
let room = [];//room[1000]
// const server = require('http').Server(app);
// const io = require('socket.io')(server);
// const SocketServices = require('./app/services/room.service.js');
let listSong = [];
let loadSong = true;
let playersdone = {};

const settingSchema = require('../models/Setting');
//const {mongooseToObject} = require('../../util/mongoose');
const cheerio = require('cheerio');
const fs = require('fs');

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
        //room_ID.push(roomid);
        //count++;
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
                        res.render('playmulti.hbs', {songs: JSON.stringify(songs), infolist, layout: false, username_player1: req.session.user.username, userid: req.session.user._id});
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
                            res.render('playmulti.hbs', {songs: JSON.stringify(songs), infolist, layout: false, username_player1: req.session.user.username, userid: req.session.user._id});
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
                    res.render('playmulti.hbs', {songs: JSON.stringify(songs), infolist, layout: false , username_player1: req.session.user.username, userid: req.session.user._id});
                    loadSong = true;
                }
                
                
            }
        })
        .catch((error) =>{
            console.log("Error: ", error);
        })
                
    }
    
}

// settingSchema.findOne({email: req.session.user.email})
//                 .then((st) => {
//                 res.render('playmulti', { songs: JSON.stringify(songs), infolist, efVL: st.EffectVL, msVL: st.MusicVL } );
//                 });
                // const html = fs.readFileSync('../../resources/views/playmulti.hbs', 'utf-8');
                // const $ = cheerio.load(html);
                // // Thay đổi thuộc tính của thẻ bất kỳ
                // let targetElement = $('#ctrlIcon'); // Thay 'selector' bằng CSS selector của thẻ cần thay đổi thuộc tính
                // targetElement.attr('class', 'fa-solid fa-pause'); // Thay 'attribute' bằng tên thuộc tính cần thay đổi, 'new value' là giá trị mới
                // // Lưu lại nội dung HTML sau khi thay đổi thuộc tính
                // const modifiedTemplate = $.html();
                // // Gửi template đã thay đổi về phía client
                // res.send(modifiedTemplate);
                // const audioPlayer = document.createElement('audio');
                // const audioSource = document.createElement('source');
                // importSongFromBase64(song[0].content, audioPlayer, audioSource);
                //console.log('Danh sách bài hát: ', song);

io.on("connection", async function(socket) {
    //await sem.acquire();
    console.log(`User connected id is ${socket.id}`);
    //console.log("RoomID[count]",room_ID[count]);
    socket.join(roomid);
    //socket.join(roomid);
    //console.log(room._id);
    //console.log(room.socketid);
    room.socketid.push(socket.id);
    room.count++;
    Room
        .updateOne({roomid: roomid}, {count: room.count, socketid: room.socketid })
        .then(() =>{
            // console.log(room);
            console.log(room.socketid);
            console.log(socket.adapter.rooms);
            if (room.vacant){
                socket.emit("player1",room);
                
                sem.release();
                console.log("Mở khóa cho socket");
            }
            else{
                // socket.emit("player2",room);
                // socket.id = room.socketid[0];
                // console.log(socket.id);
                // socket.emit("player1",room);
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
                // console.log(io.connected[socket.id]);
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
                    // console.log(socketid);
                })
                .catch((error)=>{
                    console.log("error: ",error);
                })
        })
        .catch((error)=>{
            console.log("Error: ", error);
        })
        // Room.findOneAndDelete({socketid: socket.id}, function(err,data){
        //     if (err){
        //         console.log(err)
        //       }
        //       else{
        //         console.log("Removed: ", data);
        //       }
        // })
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
})

// io.on("createRoom", function(roomid){
//     console.log(roomid);
//     socket.join(roomid);
//     console.log(socket.adapter.rooms);
// })

// io.on("disconnection",function(socket) {
//     listSob = fasle;
// })

module.exports = new playmultiController;