const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomid:{
        type: String,
        required: true,
    },
    vacant:{
        type: Boolean,
        required: true,
    },
    socketid:{
        type:  Array,
    },
    count:{
        type: Number,
        required: true,
    },
    // player:  [{
    //     userid: String,
    //     name: String,
    //     win: Boolean,
    //     score: Number,
    //     required: true,
    // }]
    player: {
        type: Array,
        required: true,
    },
    // listSong: {
    //     type: Array,
    // }
});

module.exports = mongoose.model("Room", roomSchema);
