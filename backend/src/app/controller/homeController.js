const session = require('express-session');

class homeController {
    index(req, res) {
        if (req.session.isAuth) {
            res.render('home')
        } else {
            res.redirect('/login');
        }
        
    }

    del(req, res, next) {
        req.session
            .destroy((err) => {
                if (err) {
                    console.log("err: ",err);
                    res.json({
                        status:"Failed",
                        message: "Lỗi xảy ra khi đăng xuất"
                    })
                }
                res.redirect('/login');
            })
    }
    update(req, res, next) {
        // res.redirect('/');
        res.json(req.body);
    }
}

module.exports = new homeController;