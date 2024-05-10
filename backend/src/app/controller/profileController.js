const setting = require('../models/Setting')
class profileController {
    index(req, res, next) {
        setting.findOne({email: req.session.user.email})
            .then((result) => {
                res.render('profile', {userId: req.session.user._id, VL: result.MusicVL})
            })
            .catch(next)
    }
}

module.exports = new profileController;