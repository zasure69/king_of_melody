const setting = require('../models/Setting');
const mongooseToObject = require('../../util/mongoose')
const UserGoogle = require('../models/UserGoogle')
class settingController {
    index(req, res, next) {
        if (req.session.type == "google") {
            UserGoogle.findOne({_id: req.session.passport.user})
                .then((user) => {
                    setting.findOne({email: user.email})
                    .then((result) => {
                        result.MusicVL = result.MusicVL * 100
                        result.EffectVL = result.EffectVL * 100
                        res.render('setting', {userId: user._id,
                            efVL: result.EffectVL, musicVL: result.MusicVL,
                            IsEffectOn: result.IsEffectOn, IsSoundOn: result.IsSoundOn})
                    })
                    .catch(next)
                })
                .catch((err) => {

                })
            
        } else {
            setting.findOne({email: req.session.user.email})
            .then((result) => {
                result.MusicVL = result.MusicVL * 100
                result.EffectVL = result.EffectVL * 100
                res.render('setting', {userId: req.session.user._id,
                     efVL: result.EffectVL, musicVL: result.MusicVL,
                     IsEffectOn: result.IsEffectOn, IsSoundOn: result.IsSoundOn, layout: false})
            })
            .catch(next)
        }
        
    }
}

module.exports = new settingController;