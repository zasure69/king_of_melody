const songSchema = require('../models/Song');
// const settingSchema = require('../models/Setting');

const cheerio = require('cheerio');
const { resolveSoa } = require('dns');
const fs = require('fs');

class playsingleController {
    async index(req, res) {
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
        

        
        let listsong = await songSchema.aggregate([
            { $match: { mode: req.query.mode } },
            { $sample: { size: 10} },
        ]);
        const numbers = [];
        for (let i = 0; i < listsong.length; i++) {
            numbers.push(listsong[i].index);
        }
        let hintlist = await songSchema.aggregate([
            { $match: {  mode: { $in: ["hard", "hell", "no hope"] }, index: {$nin: numbers} } },
            { $sample: { size: 20} },
            { $project: { _id: 0, name: 1, singer: 2} }
        ])

        for (let i = 0; i < listsong.length; i++) {
            hintlist.push({name: listsong[i].name, singer: listsong[i].singer});
        }

        function shuffleArray(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }
         
        shuffleArray(hintlist)
        res.render('playsingle', { songs: JSON.stringify(listsong), hintlist})
    }
    update(req, res, next) {
        songSchema.aggregate([
            { $match: { mode: req.body.mode } },
            { $sample: { size: 10} }
            ])
            .exec()
            .then((songs) => {
                
                songSchema.aggregate([
                    { $match: { mode: ["hard", "hell", "no hope"] } },
                    { $sample: { size: 20} }
                ])
                .exec()
                .then((hintlist) => {
                    res.render('playsingle', { songs: JSON.stringify(listsong), hintlist})
                })
                .catch(err => {
                    console.log("Error: ", err);
                })
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }
}

module.exports = new playsingleController;