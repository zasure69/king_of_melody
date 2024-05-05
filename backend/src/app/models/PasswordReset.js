const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passwordResetSchema = new Schema({
    userId: String,
    resetString: String,
    creates: Date,
    expires: Date,
});

module.exports = mongoose.model('PasswordReset', passwordResetSchema);