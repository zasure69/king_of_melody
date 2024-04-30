const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxLength: 255,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
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
    MusicVL: {
        type: Number,
        default: 0.5
    },
    EffectVL: {
        type: Number,
        default: 0.5
    },
    IsSoundOn: {
        type: Boolean,
        default: true
    },
    IsEffectOn: {
        type: Boolean,
        default: true
    },
    IsFullScreen: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model('User', userSchema);