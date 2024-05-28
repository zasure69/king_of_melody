const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb+srv://zasureh69:HD8d2ZNETWZlpXl0@cluster0.eglftpe.mongodb.net/king_of_melody', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };