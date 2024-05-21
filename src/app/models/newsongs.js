const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hintsongSchema = new Schema({
    song: String,
    singer: String,
})

module.exports = mongoose.model("newsongs", hintsongSchema);
