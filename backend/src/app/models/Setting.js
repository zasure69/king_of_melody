const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const settingSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxLength: 255
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
    }
})

module.exports = mongoose.model("Setting", settingSchema);
