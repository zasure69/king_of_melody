class profileController {
    index(req, res) {
        res.render('profile')
    }
}

module.exports = new profileController;