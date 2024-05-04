

class homeController {
    index(req, res) {
        res.render('home')
    }
    update(req, res, next) {
        res.redirect('/');
        // res.json(req.body);
    }
}

module.exports = new homeController;