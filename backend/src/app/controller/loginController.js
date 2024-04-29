const userSchema = require('../models/User');
class loginController {
    index(req, res) {
        res.render('login')
    }

    processSignup(req, res, next) {
        res.send(req.body);
    }
}

module.exports = new loginController;