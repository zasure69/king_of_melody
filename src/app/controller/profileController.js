const setting = require('../models/Setting')
const User = require('../models/User')
const UserGoogle = require('../models/UserGoogle')
const userSong = require('../models/SongUser')
const fs = require('fs');
const { execArgv } = require('process');
const convertToBase64 = (filePath, callback) => {
    // Đọc tệp MP3 từ đường dẫn tạm thời
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return callback(err);
        }

        // Chuyển đổi Buffer sang Base64
        const base64String = data.toString('base64');

        // Xóa tệp tạm thời sau khi đọc
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting temp file:', err);
            }
        });

        callback(null, base64String);
    });
};
class profileController {
    index(req, res, next) {
        let emailUser = "";
        if (req.session.type == "google") {
            UserGoogle.findOne({_id: req.session.passport.user})
            .then((user) => {
                emailUser = user.email
                setting.findOne({email: emailUser})
                .then ((result) => {
                    UserGoogle.findOne({email: emailUser})
                    .then((user) => {
                        let rateHard;
                        if (user.hardGames > 0) {
                            rateHard = (user.hardWinGames / user.hardGames) * 100;
                            rateHard = parseFloat(rateHard.toFixed(2));
                        } else {
                            rateHard = 0;
                        }

                        let rateHell;
                        if (user.hellGames > 0) {
                            rateHell = (user.hellWinGames / user.hellGames) * 100;
                            rateHell = parseFloat(rateHell.toFixed(2));
                        } else {
                            rateHell = 0;
                        }

                        let rateNohope;
                        if (user.nohopeGames > 0) {
                            rateNohope = (user.nohopeWinGames / user.nohopeGames) * 100;
                            rateNohope = parseFloat(rateNohope.toFixed(2));
                        } else {
                            rateNohope = 0;
                        }

                        let rateMul;
                        if (user.multiGames > 0) {
                            rateMul = (user.multiWinGames / user.multiGames) * 100;
                            rateMul = parseFloat(rateMul.toFixed(2));
                        } else {
                            rateMul = 0;
                        }

                        let complete;
                        complete = user.hardGames + user.hellGames + user.nohopeGames + user.multiGames;

                        let best;
                        best = user.hardWinGames + user.hellWinGames + user.nohopeWinGames + user.multiWinGames;

                        let rank;
                        if(user.multiPoint < 1000) rank="Đồng";
                        else if(user.multiPoint < 2400) rank="Bạc";
                        else if(user.multiPoint < 4000) rank="Vàng";
                        else if(user.multiPoint < 6000) rank="Bạch Kim";
                        else if(user.multiPoint < 8000) rank="Kim Cương";
                        else if(user.multiPoint < 12000) rank="Lục Bảo";
                        else if(user.multiPoint >= 12000) rank="Ruby Đỏ";

                        let avg;
                        if (complete > 0) {
                            avg = (best / complete) * 100;
                            avg = parseFloat(avg.toFixed(2));
                        } else {
                            avg = 0;
                        }

                        let exe;
                        if(user.CurExp < 1000) {user.Level = 1; exe = user.CurExp + "/1000";}
                        else if(user.CurExp < 2000) {user.Level = 2; exe = user.CurExp + "/2000";}
                        else if(user.CurExp < 5000) {user.Level = 3; exe = user.CurExp + "/5000";}
                        else if(user.CurExp < 10000) {user.Level = 4; exe = user.CurExp + "/10000";}
                        else if(user.CurExp < 20000) {user.Level = 5; exe = user.CurExp + "/20000";}
                        else if(user.CurExp < 50000) {user.Level = 6; exe = user.CurExp + "/50000";}
                        else if(user.CurExp >= 50000) {user.Level = 7; exe = user.CurExp + "";}

                        res.render('profile', 
                        {
                            username: user.username,
                            rank: rank,
                            complete: complete,
                            level: user.Level,
                            exe: exe,
                            best: best,
                            avg: avg,
                            hardGames: user.hardGames,
                            hardWinGames: user.hardWinGames,
                            rateHard: rateHard,
                            hellGames: user.hellGames,
                            hellWinGames: user.hellWinGames,
                            rateHell: rateHell,
                            nohopeGames: user.nohopeGames,
                            nohopeWinGames: user.nohopeWinGames,
                            rateNohope: rateNohope,
                            multiGames: user.multiGames,
                            multiWinGames: user.multiWinGames,
                            rateMul: rateMul,
                            empty: user.empty, 
                            userId: user._id, 
                            VL: result.EffectVL,
                            layout: false
                        })
                    })
                })
                .catch((err) => {
                    console.log("Lỗi xảy ra trong khi get profile gg account: ", err)
                })
            })
            .catch ((err) => {
                console.log("Lỗi xảy ra trong khi get profile gg account: ", err)
            })
        } else {
            emailUser = req.session.user.email
            setting.findOne({email: emailUser})
                .then((result) => {
                    
                    User.findOne({email: req.session.user.email})
                    .then((user) => {
                        let rateHard;
                        if (user.hardGames > 0) {
                            rateHard = (user.hardWinGames / user.hardGames) * 100;
                            rateHard = parseFloat(rateHard.toFixed(2));
                        } else {
                            rateHard = 0;
                        }

                        let rateHell;
                        if (user.hellGames > 0) {
                            rateHell = (user.hellWinGames / user.hellGames) * 100;
                            rateHell = parseFloat(rateHell.toFixed(2));
                        } else {
                            rateHell = 0;
                        }

                        let rateNohope;
                        if (user.nohopeGames > 0) {
                            rateNohope = (user.nohopeWinGames / user.nohopeGames) * 100;
                            rateNohope = parseFloat(rateNohope.toFixed(2));
                        } else {
                            rateNohope = 0;
                        }

                        let rateMul;
                        if (user.multiGames > 0) {
                            rateMul = (user.multiWinGames / user.multiGames) * 100;
                            rateMul = parseFloat(rateMul.toFixed(2));
                        } else {
                            rateMul = 0;
                        }

                        let complete;
                        complete = user.hardGames + user.hellGames + user.nohopeGames;

                        let best;
                        best = user.hardWinGames + user.hellWinGames + user.nohopeWinGames;

                        let rank;
                        if(user.multiPoint < 1000) rank="Đồng";
                        else if(user.multiPoint < 2400) rank="Bạc";
                        else if(user.multiPoint < 4000) rank="Vàng";
                        else if(user.multiPoint < 6000) rank="Bạch Kim";
                        else if(user.multiPoint < 8000) rank="Kim Cương";
                        else if(user.multiPoint < 12000) rank="Lục Bảo";
                        else if(user.multiPoint >= 12000) rank="Ruby Đỏ";

                        let avg;
                        if (complete > 0) {
                            avg = (best / complete) * 100;
                            avg = parseFloat(avg.toFixed(2));
                        } else {
                            avg = 0;
                        }

                        let exe;
                        if(user.CurExp < 1000) {user.Level = 1; exe = user.CurExp + "/1000";}
                        else if(user.CurExp < 2000) {user.Level = 2; exe = user.CurExp + "/2000";}
                        else if(user.CurExp < 5000) {user.Level = 3; exe = user.CurExp + "/5000";}
                        else if(user.CurExp < 10000) {user.Level = 4; exe = user.CurExp + "/10000";}
                        else if(user.CurExp < 20000) {user.Level = 5; exe = user.CurExp + "/20000";}
                        else if(user.CurExp < 50000) {user.Level = 6; exe = user.CurExp + "/50000";}
                        else if(user.CurExp >= 50000) {user.Level = 7; exe = user.CurExp + "";}

                        res.render('profile', 
                        {
                            username: req.session.user.username,
                            rank: rank,
                            complete: complete,
                            level: user.Level,
                            exe: exe,
                            best: best,
                            avg: avg,
                            hardGames: user.hardGames,
                            hardWinGames: user.hardWinGames,
                            rateHard: rateHard,
                            hellGames: user.hellGames,
                            hellWinGames: user.hellWinGames,
                            rateHell: rateHell,
                            nohopeGames: user.nohopeGames,
                            nohopeWinGames: user.nohopeWinGames,
                            rateNohope: rateNohope,
                            multiGames: user.multiGames,
                            multiWinGames: user.multiWinGames,
                            rateMul: rateMul,
                            empty: user.empty, 
                            userId: req.session.user._id, 
                            VL: result.EffectVL,
                            layout: false
                        })
                    })
                })
                .catch(next)
        }
        
    }
    
    update(req, res, next){
        const filePath = req.file.path;
        convertToBase64(filePath, (err, base64String) => {
            if (err) {
                console.error('Error converting file:', err);
                return res.status(500).send('Error converting file');
            }
            const upsong = new userSong({
                email: req.session.user.email,
                name: req.body.songName,
                singer: req.body.artist,
                link: req.body.link,
                content: base64String,
            })
            upsong.save()
                .then(() => {
                    setting.findOne({email: req.session.user.email})
                        .then((result) => {
                            if (req.session.type == 'google') {
                                UserGoogle.findOne({email: req.session.user.email})
                                .then((user) => {
                                        user.empty = user.empty - 1;
                                    UserGoogle.updateOne({email: req.session.user.email}, user)
                                        .then((us) => {
                                            res.redirect('/profile')
                                        })
                                        .catch(next)
                                })
                                .catch(next)
                            } else {
                                User.findOne({email: req.session.user.email})
                                .then((user) => {
                                        user.empty = user.empty - 1;
                                    User.updateOne({email: req.session.user.email}, user)
                                        .then((us) => {
                                            res.redirect('/profile')
                                        })
                                        .catch(next)
                                })
                                .catch(next)
                            }
                           
                        })
                        .catch(next)
                })
                .catch(next)
        });
    }

    changeusername (req, res) {
        
        if (req.session.type == "google") {
            UserGoogle.updateOne({_id: req.session.passport.user}, {username: req.body.username})
                .then(() => {
                    res.redirect('/profile')
                })
                .catch ((err) => {
                    console.log("Lỗi xảy ra trong khi update username: ", err)
                })
        } else {
            console.log("new username: ", req.body.username)
            User.updateOne({_id: req.session.user._id}, {username: req.body.username})
                .then((user) => {
                    req.session.user.username = req.body.username
                    res.redirect('/profile')
                })
                .catch ((err) => {
                    console.log("Lỗi xảy ra trong khi update username: ", err)
                })
                
        }
    }

    deleteuser (req, res) {
       
        if (req.session.type == "google") {
            UserGoogle.deleteOne({_id: req.session.passport.user})
                .then(() => {
                    req.session
                    .destroy((err) => {
                        if (err) {
                            console.log("err: ",err);
                            res.json({
                                status:"Failed",
                                message: "Lỗi xảy ra khi đăng xuất"
                            })
                        }
                        res.redirect('/login');
                    })
                })
                .catch ((err) => {
                    console.log("Lỗi xảy ra trong khi delete user: ", err)
                })
        } else {
            User.deleteOne({_id: req.session.user._id})
                .then(() => {
                    req.session
                    .destroy((err) => {
                        if (err) {
                            console.log("err: ",err);
                            res.json({
                                status:"Failed",
                                message: "Lỗi xảy ra khi đăng xuất"
                            })
                        }
                        res.redirect('/login');
                    })
                })
                .catch ((err) => {
                    console.log("Lỗi xảy ra trong khi delete user: ", err)
                })
                
        }
    }
}

module.exports = new profileController;
