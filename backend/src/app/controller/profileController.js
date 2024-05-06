class profileController {
    index(req, res) {
        res.render('profile', {userId: req.params.userId})
    }
}

module.exports = new profileController;