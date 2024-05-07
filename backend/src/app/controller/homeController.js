const session = require('express-session');
const userSchema = require('../models/User');
const mongooseToObject = require('../../util/mongoose')

class homeController {
    index(req, res) {
        if (req.session.isAuth) {
            userSchema.findOne({_id: req.params.userId})
                .then((result) => {
                    res.render('home', {username: result.username, userId: req.params.userId})
                })
                .catch(err => {
                    console.log('Error: ', err);
                    res.json({
                        status: "Failed",
                        message: "Lỗi xảy ra khi lay thong tin nguoi dung"
                    })
                })
            
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
        res.render('home')
        // res.json(req.body);
    }
}

module.exports = new homeController;