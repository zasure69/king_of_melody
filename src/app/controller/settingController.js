const setting = require('../models/Setting');
const mongooseToObject = require('../../util/mongoose')
class settingController {
    index(req, res, next) {
        setting.findOne({email: req.session.user.email})
            .then((result) => {
                result.MusicVL = result.MusicVL * 100
                result.EffectVL = result.EffectVL * 100
                res.render('setting', {userId: req.session.user._id,
                     efVL: result.EffectVL, musicVL: result.MusicVL,
                     IsEffectOn: result.IsEffectOn, IsSoundOn: result.IsSoundOn})
            })
            .catch(next)
    }
}

module.exports = new settingController;