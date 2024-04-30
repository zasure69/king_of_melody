const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const songSchema = new Schema({
    content: String,
    name: String,
    singer: String,
    link: String,
    index: Number,
    mode: String,
    lyric: Boolean
})

module.exports = mongoose.model("Song", songSchema);
