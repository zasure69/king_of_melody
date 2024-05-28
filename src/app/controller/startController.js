const session = require('express-session')

class startController {
    index(req, res) {
        if (req.session.isAuth == true) {
            res.redirect('/home')
        } else {
            res.render('start', {layout: false})
        }
        
    }
}

module.exports = new startController;