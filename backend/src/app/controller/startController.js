const session = require('express-session')

class startController {
    index(req, res) {
        if (req.session.isAuth == true) {
            res.redirect('/home')
        } else {
            res.render('start')
        }
        
    }
}

module.exports = new startController;