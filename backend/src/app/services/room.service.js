const mongooseToObject = require('../../util/mongoose')
const Room = require('../models/Room');
class SocketServices
{
    connection(socket){
        console.log(`User connected id is ${socket.id}`);
        
        socket.on("disconnect", () => {
            console.log("user disconnect!");
            // console.log(socket.rooms);
            console.log(socket.adapter.rooms);
            socket.emit("outroom", (socket));
        })
        socket.on("createRoom", roomID =>{
            console.log(roomID);
            socket.join(roomID);
            console.log(socket.adapter.rooms);
            _io.to(roomID).emit("createRoom", roomID);
        })
        // socket.on("playnow")
        // {
        //     //console.log(roomID);
        //     socket.join(roomID);
        //     console.log(socket.adapter.rooms);
        //     _io.to(roomID).emit("createRoom", roomID);
        // }
    }
}

module.exports = new SocketServices();