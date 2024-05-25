const songSchema = require('../models/Song');
const Room = require('../models/Room'); 
const User = require('../models/User');
const UserGoogle = require('../models/UserGoogle');
const io  = require('../../index');
let roomid = "";
let room = [];

let listSong = [];
let loadSong = {};
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
        console.log("sem value: ", sem.count);
        await sem.acquire();
        roomid = req.params.roomid;
        let round = parseInt(req.params.round);
        console.log("Round multi: ", round);
        console.log("roomid index: ", roomid);
        Room.findOne({roomid})
        .then((rooms) =>{
            room = rooms;
            console.log("number of player in room: ",rooms.player.length);
            if (rooms.vacant == true || rooms.count == 0)
            {
                rooms.count++;
                Room
                .updateOne({roomid: rooms.roomid}, {count: rooms.count })
                .then(() =>{
                    loadSong[rooms.roomid] = false;
                    console.log("room count: ",rooms.count);
                    console.log("loadsong if 1", loadSong[rooms.roomid], req.session.user._id);
                    playersdone[roomid] = 0;
                    songSchema.aggregate([
                        { $match: { mode: { $in: ["hard", "hell", "no hope"] } } },
                        { $sample: { size: round} }
                        ])
                        .exec()
                        .then((songs) => {
                            listSong = songs;
                            const infolist = [];
                            for (let i = 0; i < songs.length; i++) {
                                infolist.push({name: songs[i].name, singer: songs[i].singer, link: songs[i].link});
                            }
                            
                            // console.log("loadsong if 2", loadSong[rooms.roomid]);
                            settingSchema.findOne({email: req.session.user.email})
                            .then((st) => {
                                res.render('playmulti.hbs', {songs: JSON.stringify(songs), infolist, layout: false, username_player1: req.session.user.username, userid: req.session.user._id,  efVL: st.EffectVL, msVL: st.MusicVL, rom: room.roomid, round1: round});
                                sem.release();
                                while(sem.count > 1)
                                {
                                    sem.count--;
                                    sem.queue.shift();
                                }
                            });
                        })
                        .catch(err => {
                            console.log('error: ', err)
                        })
                })
                .catch((err) => {
                    console.log("error: ",err);
                })
                
            }
            else
            {
                if (loadSong[rooms.roomid]){
                    rooms.count++;
                    // console.log("loadsong else if 1", loadSong[rooms.roomid]);
                    songSchema.aggregate([
                        { $match: { mode: { $in: ["hard", "hell", "no hope"] } } },
                        { $sample: { size: round} }
                        ])
                        .exec()
                        .then((songs) => {
                            listSong = songs;
                            const infolist = [];
                            for (let i = 0; i < songs.length; i++) {
                                infolist.push({name: songs[i].name, singer: songs[i].singer, link: songs[i].link});
                            }
                            loadSong[rooms.roomid] = false;
                            console.log("loadsong else if 2", loadSong[rooms.roomid]);
                            settingSchema.findOne({email: req.session.user.email})
                            .then((st) => {
                                res.render('playmulti.hbs', {songs: JSON.stringify(songs), infolist, layout: false, username_player1: req.session.user.username, userid: req.session.user._id, efVL: st.EffectVL, msVL: st.MusicVL, rom: room.roomid, round1: round});
                                sem.release();
                                while(sem.count > 1)
                                {
                                    sem.count--;
                                    sem.queue.shift();
                                }
                            });
                        })
                        .catch(err => {
                            console.log('error: ', err)
                        })
                }
                else {
                    rooms.count++;
                    console.log("loadsong else else 1", loadSong[rooms.roomid]);
                    let songs = listSong;
                    const infolist = [];
                    for (let i = 0; i < songs.length; i++) {
                        infolist.push({name: songs[i].name, singer: songs[i].singer, link: songs[i].link});
                    }
                    settingSchema.findOne({email: req.session.user.email})
                    .then((st) => {
                        res.render('playmulti.hbs', {songs: JSON.stringify(songs), infolist, layout: false , username_player1: req.session.user.username, userid: req.session.user._id, efVL: st.EffectVL, msVL: st.MusicVL, rom: room.roomid, round1: round});
                        sem.release();
                        while(sem.count > 1)
                        {
                            sem.count--;
                            sem.queue.shift();
                        }
                        loadSong[rooms.roomid] = true;
                        console.log("loadsong else else 2", loadSong[rooms.roomid]);
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
    // await sem.acquire();
    let ID_room = "";
    socket.emit("pull_roomid");
    socket.on("push_roomid", function(roomid){
        ID_room = roomid;
        console.log("Roomid 1: ", roomid, typeof roomid);
        socket.join(ID_room);
        console.log("ID_room: ", ID_room, typeof ID_room);
        Room.findOne({roomid: ID_room})
        .then((loadroom) => {
            console.log("loadroom ", loadroom);
            loadroom.socketid.push(socket.id);
            // loadroom.count++;
            Room
                .updateOne({roomid: loadroom.roomid}, { socketid: loadroom.socketid })
                .then(() =>{
                    Room.findOne({socketid: socket.id})
                    .then((send) => {
                        console.log(send.socketid);
                        if (send.socketid.length != 2 || loadSong[send.roomid] == false) socket.emit("wait");
                        else io.to(send.roomid).emit("start"); 
                    })
                    .catch((err) => {
                        console.log("error",err);
                    })
                    console.log(loadroom.socketid);
                    console.log(socket.adapter.rooms);
                    if (room.vacant){
                        socket.emit("player1",loadroom);
                        
                        sem.release();
                        while(sem.count > 1)
                        {
                            sem.count--;
                            sem.queue.shift();
                        }
                        console.log("Mở khóa cho socket");
                    }
                    else{
                        if (loadroom.count <= 2)
                        {
                            const socketsInRoom = io.sockets.adapter.rooms.get(loadroom.roomid);
                            if (socketsInRoom) {
                                // Lặp qua danh sách socket trong room
                                socketsInRoom.forEach((socketId) => {
                                    const socket = io.sockets.sockets.get(socketId);
                                    // Sử dụng socket tại đây
                                    if(socketId === loadroom.socketid[0]){
                                        socket.emit("player1",loadroom);
                                        console.log("Mở khóa cho socket");
                                        sem.release();
                                        while(sem.count > 1)
                                        {
                                            sem.count--;
                                            sem.queue.shift();
                                        }
                                    }
                                    else{
                                        socket.emit("player2",loadroom);
                                    }
                                    console.log(`Socket ID: ${socketId}`);
                                    
                                });
                            } else {
                                console.log(`Không có socket nào trong room`);
                            }
                        }
                        else
                        {
                            io.in(loadroom.roomid).emit("remain_players", loadroom.player[0].username, loadroom.player[1].username);
                            sem.release();
                            while(sem.count > 1)
                            {
                                sem.count--;
                                sem.queue.shift();
                            }
                        }
                        
                    }
                })
                .catch(err => {
                    console.log("error: ",err);
                })
        })
        .catch((err) => {
            console.log("error",err);
        })
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
                socket.emit("wait");
                if (playersdone[send.roomid] == 2) {
                    io.in(send.roomid).emit('endgame');
                    playersdone[send.roomid] = 0;
                }     
                 
            })
            .catch((error)=>{
                console.log("Error: ", error);
            })
        
    })
    socket.on("disconnect", async() =>
    {
        console.log(`${socket.id} has disconnect!`);
        Room.findOne({socketid: socket.id})
        .then((send) => {
                const newroom = send.socketid.filter(item => item != socket.id);
                Room.updateOne({roomid: send.roomid},{$set: {socketid: newroom}})
                    .then(()=>{
                        if (newroom.length) {
                            send.socketid = newroom;
                        }
                        else {
                            Room.deleteOne({roomid: send.roomid})
                            .then()
                            .catch((err) =>{
                                console.log("error: ",err);
                            })
                        }
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
        console.log(socket.id);
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
                else {
                    loadSong[send.roomid] = true;
                    Room.findOne({roomid: send.roomid})
                    .then((newroom) => {
                    socket.to(newroom.roomid).emit("player1", newroom);
                    socket.to(newroom.roomid).emit("wait");
                    console.log("test what happern!");
                    })
                    .catch((err) => {
                        console.log("error",err);
                    })
                }
                // sem.release();
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
        UserGoogle.findOne({_id: iduser})
        .then((user_win)=>{
            if (user_win)
            {
                user_win.multiWinGames++;
                const win = user_win.multiWinGames;
                user_win.multiGames++;
                const round = user_win.multiGames;
                user_win.CurExp += score/10;
                if (user_win.multiPoint <= 1000)
                {
                    user_win.multiPoint += score/10;
                }
                else if (user_win.multiPoint <= 2400)
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
                UserGoogle.updateOne({_id: iduser}, {multiWinGames: win, multiGames: round, CurExp: user_win.CurExp, multiPoint: user_win.multiPoint})
                .then()
                .catch((error)=>{
                    console.log("Error: ", error);
                })
            }
            else
            {
                User.findOne({_id: iduser})
                .then((user_win)=>{
                user_win.multiWinGames++;
                const win = user_win.multiWinGames;
                user_win.multiGames++;
                const round = user_win.multiGames;
                user_win.CurExp += score/10;
                if (user_win.multiPoint <= 1000)
                {
                    user_win.multiPoint += score/10;
                }
                else if (user_win.multiPoint <= 2400)
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
            }
        })
        .catch((error)=>{
            console.log("Error: ", error);
        })
    })
    socket.on("score_lose", (score, iduser)=>{
        UserGoogle.findOne({_id: iduser})
        .then((user_lose)=>{
            if (user_lose)
            {
                user_lose.multiGames++;
                const round = user_lose.multiGames;
                user_lose.CurExp += score/10;
                if (user_lose.multiPoint <= 1000 && user_lose.multiPoint > 0)
                {
                    user_lose.multiPoint -= parseInt(user_lose.multiPoint/80);
                    if (user_lose.multiPoint < 0)
                        user_lose.multiPoint = 0;
                }
                else if (user_lose.multiPoint <= 2400 && user_lose.multiPoint > 1000)
                {
                    user_lose.multiPoint -= parseInt(user_lose.multiPoint/70);
                }
                else if (user_lose.multiPoint <= 4000 && user_lose.multiPoint > 2400)
                {
                    user_lose.multiPoint -= parseInt(user_lose.multiPoint/60);
                }
                else if (user_lose.multiPoint <= 6000 && user_lose.multiPoint > 4000)
                {
                    user_lose.multiPoint -= parseInt(user_lose.multiPoint/50);
                }
                else if (user_lose.multiPoint <= 8000 && user_lose.multiPoint > 6000)
                {
                    user_lose.multiPoint -= parseInt(user_lose.multiPoint/40);
                }
                else if (user_lose.multiPoint <= 12000 && user_lose.multiPoint > 8000)
                {
                    user_lose.multiPoint -= parseInt(user_lose.multiPoint/30);
                }
                else if (user_lose.multiPoint > 12000)
                {
                    user_lose.multiPoint -= parseInt(user_lose.multiPoint/20);
                }
                UserGoogle.updateOne({_id: iduser}, {multiGames: round, CurExp: user_lose.CurExp, multiPoint: user_lose.multiPoint})
                .then()
                .catch((error)=>{
                    console.log("Error: ", error);
                })
            }
            else 
            {
                User.findOne({_id: iduser})
                .then((user_lose)=>{
                    user_lose.multiGames++;
                    const round = user_lose.multiGames;
                    user_lose.CurExp += score/10;
                    if (user_lose.multiPoint <= 1000 && user_lose.multiPoint > 0)
                    {
                        user_lose.multiPoint -= parseInt(user_lose.multiPoint/80);
                        if (user_lose.multiPoint < 0)
                            user_lose.multiPoint = 0;
                    }
                    else if (user_lose.multiPoint <= 2400 && user_lose.multiPoint > 1000)
                    {
                        user_lose.multiPoint -= parseInt(user_lose.multiPoint/70);
                    }
                    else if (user_lose.multiPoint <= 4000 && user_lose.multiPoint > 2400)
                    {
                        user_lose.multiPoint -= parseInt(user_lose.multiPoint/60);
                    }
                    else if (user_lose.multiPoint <= 6000 && user_lose.multiPoint > 4000)
                    {
                        user_lose.multiPoint -= parseInt(user_lose.multiPoint/50);
                    }
                    else if (user_lose.multiPoint <= 8000 && user_lose.multiPoint > 6000)
                    {
                        user_lose.multiPoint -= parseInt(user_lose.multiPoint/40);
                    }
                    else if (user_lose.multiPoint <= 12000 && user_lose.multiPoint > 8000)
                    {
                        user_lose.multiPoint -= parseInt(user_lose.multiPoint/30);
                    }
                    else if (user_lose.multiPoint > 12000)
                    {
                        user_lose.multiPoint -= parseInt(user_lose.multiPoint/20);
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
            }
            
        })
        .catch((error)=>{
            console.log("Error: ", error);
        }) 
    })
    socket.on("score_draw", (score, iduser)=>{
        UserGoogle.findOne({_id: iduser})
        .then((user_draw)=>{
            if (user_draw) {
                user_draw.multiGames++;
                const round = user_draw.multiGames;
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
                UserGoogle.updateOne({_id: iduser}, {multiGames: round, CurExp: user_draw.CurExp, multiPoint: user_draw.multiPoint})
                        .then()
                        .catch((error)=>{
                            console.log("Error: ", error);
                        })
            } 
            else 
            {
                User.findOne({_id: iduser})
                .then((user_draw)=>{
                    user_draw.multiGames++;
                    const round = user_draw.multiGames;
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
            }
                
            })
            .catch((error)=>{
                console.log("Error: ", error);
            })
        })
    socket.on("likeicon",function() {
        Room.findOne({socketid: socket.id})
        .then((send) => {
            socket.to(send.roomid).emit("likeicon");
        })
        .catch((err) => {
            console.log("error",err);
        })
    })
    socket.on("dislikeicon",function() {
        Room.findOne({socketid: socket.id})
        .then((send) => {
            socket.to(send.roomid).emit("dislikeicon");
        })
        .catch((err) => {
            console.log("error",err);
        })
    })
    socket.on("sadicon",function() {
        Room.findOne({socketid: socket.id})
        .then((send) => {
            socket.to(send.roomid).emit("sadicon");
        })
        .catch((err) => {
            console.log("error",err);
        })
    })
    socket.on("smileicon",function() {
        Room.findOne({socketid: socket.id})
        .then((send) => {
            socket.to(send.roomid).emit("smileicon");
        })
        .catch((err) => {
            console.log("error",err);
        })
    })
    socket.on("angryicon",function() {
        Room.findOne({socketid: socket.id})
        .then((send) => {
            socket.to(send.roomid).emit("angryicon");
        })
        .catch((err) => {
            console.log("error",err);
        })
    })
    socket.on("hearticon",function() {
        Room.findOne({socketid: socket.id})
        .then((send) => {
            socket.to(send.roomid).emit("hearticon");
        })
        .catch((err) => {
            console.log("error",err);
        })
    })
    socket.on("sendmess", function(mess) {
        Room.findOne({socketid: socket.id})
        .then((send) => {
            console.log("send success");
            socket.to(send.roomid).emit("sendmess",mess);
        })
        .catch((err) => {
            console.log("error",err);
        })
    })
    socket.on("exit", function(iduser, score){
        User.findOne({_id: iduser})
        .then((user_lose)=>{
            user_lose.multiGames++;
            const round = user_lose.multiGames;
            user_lose.CurExp += score/10;
            if (user_lose.multiPoint <= 1000 && user_lose.multiPoint > 0)
            {
                user_lose.multiPoint -= parseInt(user_lose.multiPoint/50);
                if (user_lose.multiPoint < 0)
                    user_lose.multiPoint = 0;
            }
            else if (user_lose.multiPoint <= 2400 && user_lose.multiPoint > 1000)
            {
                user_lose.multiPoint -= parseInt(user_lose.multiPoint/45);
            }
            else if (user_lose.multiPoint <= 4000 && user_lose.multiPoint > 2400)
            {
                user_lose.multiPoint -= parseInt(user_lose.multiPoint/40);
            }
            else if (user_lose.multiPoint <= 6000 && user_lose.multiPoint > 4000)
            {
                user_lose.multiPoint -= parseInt(user_lose.multiPoint/35);
            }
            else if (user_lose.multiPoint <= 8000 && user_lose.multiPoint > 6000)
            {
                user_lose.multiPoint -= parseInt(user_lose.multiPoint/30);
            }
            else if (user_lose.multiPoint <= 12000 && user_lose.multiPoint > 8000)
            {
                user_lose.multiPoint -= parseInt(user_lose.multiPoint/25);
            }
            else if (user_lose.multiPoint > 12000)
            {
                user_lose.multiPoint -= parseInt(user_lose.multiPoint/15);
            }
            User.updateOne({_id: iduser}, {multiGames: round, CurExp: user_lose.CurExp, multiPoint: user_lose.multiPoint})
            .then( () => {
                Room.findOne({socketid: socket.id})
                .then((send) => {
                    socket.to(send.roomid).emit("endgame_exit");
                })
                .catch((err) => {
                    console.log("error",err);
                })
            })
            .catch((error)=>{
                console.log("Error: ", error);
            })
        })
        .catch((error)=>{
            console.log("Error: ", error);
        })
    })
    socket.on("afk", function(iduser, score){
        User.findOne({_id: iduser})
        .then((user_lose)=>{
            user_lose.multiGames++;
            const round = user_lose.multiGames;
            user_lose.CurExp += score/10;
            user_lose.multiPoint -= 1000;
            if (user_lose.multiPoint < 0)
                user_lose.multiPoint = 0;
            User.updateOne({_id: iduser}, {multiGames: round, CurExp: user_lose.CurExp, multiPoint: user_lose.multiPoint})
            .then( () => {
                Room.findOne({socketid: socket.id})
                .then((send) => {
                    socket.to(send.roomid).emit("endgame_exit");
                })
                .catch((err) => {
                    console.log("error",err);
                })
            })
            .catch((error)=>{
                console.log("Error: ", error);
            })
        })
        .catch((error)=>{
            console.log("Error: ", error);
        })
    })
    socket.on("check_player", function(score, iduser, roomid){
        Room.findOne({roomid: roomid})
        .then((rooms)=>{
            if (rooms.socketid.length < 2)
            {
                socket.emit("endgame_exit");
                let iduser_afkplayer = "";
                if (rooms.player[0].userid != iduser)
                {
                    iduser_afkplayer = rooms.player[0].userid;
                    const newroom = rooms.player[1];
                    Room.updateOne({roomid: send.roomid},{$set: {player: newroom}})
                        .then()
                        .catch((error)=>{
                            console.log("error: ",error);
                        })
                }
                else if (rooms.player[1].userid != iduser)
                {
                    iduser_afkplayer = rooms.player[1].userid;
                    const newroom = rooms.player[0];
                    Room.updateOne({roomid: send.roomid},{$set: {player: newroom}})
                        .then()
                        .catch((error)=>{
                            console.log("error: ",error);
                        })
                }

                User.findOne({_id: iduser_afkplayer})
                .then((user_lose)=>{
                    user_lose.multiGames++;
                    const round = user_lose.multiGames;
                    user_lose.CurExp += score/10;
                    user_lose.multiPoint -= 1000;
                    if (user_lose.multiPoint < 0)
                        user_lose.multiPoint = 0;
                    User.updateOne({_id: iduser_afkplayer}, {multiGames: round, CurExp: user_lose.CurExp, multiPoint: user_lose.multiPoint})
                    .then( () => {
                        Room.findOne({socketid: socket.id})
                        .then((send) => {
                            socket.to(send.roomid).emit("endgame_exit");
                            
                        })
                        .catch((err) => {
                            console.log("error",err);
                        })
                    })
                    .catch((error)=>{
                        console.log("Error: ", error);
                    })
                    
                })
                .catch((error)=>{
                    console.log("Error: ", error);
                })
            }
        })
        .catch((err) =>{
            console.log("Errrrrroor: ", err);
        })
    })
})


module.exports = new playmultiController;