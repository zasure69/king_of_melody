const songSchema = require('../models/Song');

class playmultiController {
    index(req, res) {
        res.render('playmulti')
        songSchema.aggregate([
            { $match: { mode: { $in: ["hard", "hell", "no hope"] } } },
            { $sample: { size: 10} }
            ])
            .exec()
            .then((songs) => {
                res.render('playmulti')
                console.log('Danh sách bài hát: ', songs);
                
            })
            .catch((error) => {
                console.log("Error: ", error);
            })
    }
}

module.exports = new playmultiController;