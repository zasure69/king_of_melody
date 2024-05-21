const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UsersongSchema = new Schema({
    email: String,
    name: String,
    singer: String,
    link: String,
    content: String,
});

module.exports = mongoose.model("SongUser", UsersongSchema);
