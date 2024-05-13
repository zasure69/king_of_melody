const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const settingSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
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
        type: String,
        default: "on"
    },
    IsEffectOn: {
        type: String,
        default: "on"
    },
})

module.exports = mongoose.model("Setting", settingSchema);
