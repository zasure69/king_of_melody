const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    verified: {
        type: Boolean,
    },
    empty: {
        type: Number,
        default: 25,
    },
    hardGames: {
        type: Number,
        default: 0
    },
    hardWinGames: {
        type: Number,
        default: 0
    },
    hellGames: {
        type: Number,
        default: 0
    },
    hellWinGames: {
        type: Number,
        default: 0
    },
    nohopeGames: {
        type: Number,
        default: 0
    },
    nohopeWinGames: {
        type: Number,
        default: 0
    },
    multiGames: {
        type: Number,
        default: 0
    },
    multiWinGames: {
        type: Number,
        default: 0
    },
    Level: {
        type: Number,
        default: 1
    },
    CurExp: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("User", userSchema);
