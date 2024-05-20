const setting = require('../models/Setting')
const User = require('../models/User')
const UserGoogle = require('../models/UserGoogle')
const userSong = require('../models/SongUser')
const fs = require('fs');
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
        setting.findOne({email: req.session.user.email})
            .then((result) => {
                if (req.session.type == 'google') {
                    UserGoogle.findOne({email: req.session.user.email})
                    .then((user) => {
                        res.render('profile', {username: req.session.user.username, empty: user.empty, userId: req.session.user._id, VL: result.EffectVL})
                        //res.json({user: user, VL: result.EffectVL})
                    })
                } else {
                    User.findOne({email: req.session.user.email})
                    .then((user) => {
                        res.render('profile', {username: req.session.user.username, empty: user.empty, userId: req.session.user._id, VL: result.EffectVL})
                        //res.json({user: user, VL: result.EffectVL})
                    })
                }
                
            })
            .catch(next)
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
                                            res.render('profile', {empty: user.empty, userId: req.session.user._id, VL: result.EffectVL})
                                        })
                                        .catch(next)
                                    //res.json({user: user, VL: result.EffectVL})
                                })
                                .catch(next)
                            } else {
                                User.findOne({email: req.session.user.email})
                                .then((user) => {
                                        user.empty = user.empty - 1;
                                    User.updateOne({email: req.session.user.email}, user)
                                        .then((us) => {
                                            res.render('profile', {empty: user.empty, userId: req.session.user._id, VL: result.EffectVL})
                                        })
                                        .catch(next)
                                    //res.json({user: user, VL: result.EffectVL})
                                })
                                .catch(next)
                            }
                           
                        })
                        .catch(next)
                })
                .catch(next)
        });
    }
}

module.exports = new profileController;