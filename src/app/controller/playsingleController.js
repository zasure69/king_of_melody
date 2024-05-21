const songSchema = require('../models/Song');
const settingSchema = require('../models/Setting');
const hintsongSchema = require('../models/newsongs');
const User = require('../models/User');
const UserGoogle = require('../models/UserGoogle');
const { io, app } = require('../..');
const { resolveSoa } = require('dns');

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
        const infolist = [];
        for (let i = 0; i < listsong.length; i++) {
            infolist.push({name: listsong[i].name, singer: listsong[i].singer, link: listsong[i].link});
        }
        let hintlist = await hintsongSchema.aggregate([
            { $sample: { size: 20} }
            // { $project: { _id: 0, name: 1, singer: 2} }
        ])

        for (let i = 0; i < listsong.length; i++) {
            hintlist.push({song: listsong[i].name, singer: listsong[i].singer});
        }

        function shuffleArray(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }
        const st = await settingSchema.findOne({email: req.session.user.email});
        shuffleArray(hintlist);
        res.render('playsingle', { songs: JSON.stringify(listsong), hintlist, infolist, efVL: st.EffectVL, msVL: st.MusicVL, username: req.session.user.username, userid: req.session.user._id, mode : req.query.mode});
    }
}
io.on("connection", function (socket){
    socket.on("score_end", function(score, iduser, mode, numright){
        console.log("Single score: ", score, iduser, mode, numright);
        UserGoogle.findOne({_id: iduser})
        .then((user)=>{
            if (user) 
            {
                if (mode == "hard")
                {
                    user.CurExp += score/20;
                    user.hardGames += 1;
                    if (numright == 10)
                    {
                        user.hardWinGames += 1;
                    }
                    UserGoogle.updateOne({_id: iduser}, {CurExp: user.CurExp, hardGames: user.hardGames, hardWinGames: user.hardWinGames})
                    .then()
                    .catch((error)=>{
                        console.log("Error: ", error);
                    })
                }
                else if (mode == "hell")
                {
                    user.CurExp += score/15;
                    user.hellGames += 1;
                    if (numright == 10)
                    {
                        user.hellWinGames += 1;
                    }
                    UserGoogle.updateOne({_id: iduser}, {CurExp: user.CurExp, hellGames: user.hellGames, hellWinGames: user.hellWinGames})
                    .then()
                    .catch((error)=>{
                        console.log("Error: ", error);
                    })
                }
                else
                {
                    user.CurExp += score/10;
                    user.nohopeGames += 1;
                    if (numright == 10)
                    {
                        user.nohopeWinGames += 1;
                    }
                    UserGoogle.updateOne({_id: iduser}, {CurExp: user.CurExp, nohopeGames: user.nohopeGames, nohopeWinGames: user.nohopeWinGames})
                    .then()
                    .catch((error)=>{
                        console.log("Error: ", error);
                    })
                }
                
            } 
            else 
            {
                User.findOne({_id: iduser})
                .then((user)=>
                {
                    if (mode == "hard")
                    {
                        user.CurExp += score/20;
                        user.hardGames += 1;
                        if (numright == 10)
                        {
                            user.hardWinGames += 1;
                        }
                        User.updateOne({_id: iduser}, {CurExp: user.CurExp, hardGames: user.hardGames, hardWinGames: user.hardWinGames})
                        .then()
                        .catch((error)=>{
                            console.log("Error: ", error);
                        })
                    }
                    else if (mode == "hell")
                    {
                        user.CurExp += score/15;
                        user.hellGames += 1;
                        if (numright == 10)
                        {
                            user.hellWinGames += 1;
                        }
                        User.updateOne({_id: iduser}, {CurExp: user.CurExp, hellGames: user.hellGames, hellWinGames: user.hellWinGames})
                        .then()
                        .catch((error)=>{
                            console.log("Error: ", error);
                        })
                    }
                    else
                    {
                        user.CurExp += score/10;
                        user.nohopeGames += 1;
                        if (numright == 10)
                        {
                            user.nohopeWinGames += 1;
                        }
                        User.updateOne({_id: iduser}, {CurExp: user.CurExp, nohopeGames: user.nohopeGames, nohopeWinGames: user.nohopeWinGames})
                        .then()
                        .catch((error)=>{
                            console.log("Error: ", error);
                        })
                    }
                })
            }
        })
    })
    
})

module.exports = new playsingleController;