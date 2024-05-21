const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userVerificationSchema = new Schema({
    userId: String,
    uniqueString: String,
    creates: Date,
    expires: Date,
});

module.exports = mongoose.model('UserVerfication', userVerificationSchema);