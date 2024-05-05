const songSchema = require('../models/Song');
// const settingSchema = require('../models/Setting');

const cheerio = require('cheerio');
const fs = require('fs');

class playsingleController {
    index(req, res) {
    //     const document = fs.readFileSync('../../resources/views/playsingle.hbs', 'utf8');
    //     const $ = cheerio.load(document);
    //     songsSchema.aggregate([
    //         { $match: { mode: { $in: ["hard", "hell", "no hope"] } } },
    //         { $sample: { size: 10} }
    //         ])
    //         .exec()
    //         .then((songs) => {
    //             res.render('playmulti')
    //             console.log('Danh sách bài hát: ', songs);
                
    //         })
    //         .catch((error) => {
    //             console.log("Error: ", error);
    //         })
        res.render('playsingle')
    }
    update(req, res, next) {
        songSchema.aggregate([
            { $match: { mode: req.body.mode } },
            { $sample: { size: 10} }
            ])
            .exec()
            .then((songs) => {
                const randomNumber = Math.floor(Math.random() * 10);
                const curSong = songs[randomNumber];
                res.render('playsingle', { songs, curSong, })
                // res.json(songs)
            })
            .catch(next)
    }
}

module.exports = new playsingleController;