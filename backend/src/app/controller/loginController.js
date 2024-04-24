class loginController {
    index(req, res) {
        res.render('login')
    }
}

module.exports = new loginController;