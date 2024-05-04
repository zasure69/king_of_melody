const songsSchema = require('../models/Song');

const cheerio = require('cheerio');
const fs = require('fs');

class playsingleController {
    index(req, res) {
        const document = fs.readFileSync('../../resources/views/playsingle.hbs', 'utf8');
        const $ = cheerio.load(document);
        songsSchema.aggregate([
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
        res.render('playsingle')
    }
    update(req, res, next) {
        res.redirect("/playsingle");
        // res.json(req.body); req.body = {"mode": "..."}
    }
}

module.exports = new playsingleController;