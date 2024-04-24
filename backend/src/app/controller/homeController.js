
class homeController {
    index(req, res) {
        res.render('home')
    }
    post(req, res) {
        res.redirect('/');
    }
}

module.exports = new homeController;