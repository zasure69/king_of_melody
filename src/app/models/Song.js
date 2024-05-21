const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const songSchema = new Schema({
    content: String,
    name: String,
    singer: String,
    link: String,
    mode: String,
})

module.exports = mongoose.model("Song", songSchema);
