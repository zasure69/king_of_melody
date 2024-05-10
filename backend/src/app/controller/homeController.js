const session = require('express-session');
const userSchema = require('../models/User');
const setting = require('../models/Setting');
const mongooseToObject = require('../../util/mongoose')


class homeController {
    index(req, res) {
        if (req.session.isAuth) {
            userSchema.findOne({_id: req.params.userId})
                .then((result) => {
                    res.render('home', {username: req.session.user.username, userId: req.session.user._id})
                })
                .catch(err => {
                    console.log('Error: ', err);
                    res.json({
                        status: "Failed",
                        message: "Lỗi xảy ra khi lay thong tin nguoi dung"
                    })
                })
        } else {
            res.redirect('/login');
        }

        
    }

    del(req, res, next) {
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
    }
    update(req, res, next) {
        if (!req.body.IsSoundOn){
            req.body.IsSoundOn = "off";
            req.body.MusicVL = 0;
        } else req.body.MusicVL = req.body.MusicVL / 100
        if (!req.body.IsEffectOn){
            req.body.IsEffectOn = "off";
            req.body.EffectVL = 0;
        } else req.body.EffectVL = req.body.EffectVL / 100
        setting.updateOne({email: req.session.user.email}, req.body)
            .then(() => {
                res.render('home', {userId: req.session.user._id})
            })
            .catch(next)

        // res.render('home', {username: req.session.user.username, userId: req.session.user._id})
        // res.json(req.body);
        // res.json(req.session)
    }
}

module.exports = new homeController;