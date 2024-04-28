module.exports = {
    multipleMongooseToObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    //use in cases of one document
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};