const userSchema = require('../models/User');
//lib sessions
const session = require('express-session');
//lib hash
const bcrypt = require('bcrypt');
const passwordResetSchema = require('../models/PasswordReset');
const userVerificationSchema = require('../models/UserVerification');
const settingSchema = require('../models/Setting');
//email handler
const nodemailer = require('nodemailer');
//google auth
const passport = require('passport');
//unique string
const {v4: uuidv4} = require('uuid');
//env variables
require('dotenv').config();
//nodeemailer stuff
let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
        user: "king.of.melody.nhom.11@gmail.com",
        pass: "nhjjcjtxrzkjyiuy"
    },
    tls: {
        rejectUnauthorized: true
    }
});

const sendVerificationEmail = ({_id, email}, res) => {
    const currentUrl = "https://kingofmelody-8911b7a7e907.herokuapp.com";
    const uniqueString = uuidv4() + _id;
    const mailOptions = {
        from: 'king.of.melody.nhom.11@gmail.com',
        to: email,
        subject: "Xác nhận đăng ký",
        html: `
        <p>Chào mừng bạn đến với King of Melody. Vui lòng nhấn vào link sau để xác nhận email đăng ký</p>
        <a href="${
            currentUrl + "/verify/" + _id + "/" + uniqueString 
        }">Nhấn vào đây</a>
        <p>Link này sẽ <b>hết hạn sau 5 giờ</b></p>
        `
    }

    //hash unique string
    const saltRound = 10;
    bcrypt
        .hash(uniqueString, saltRound)
        .then(hashUniqueString => {
            //set value
            const newUserVerification = new userVerificationSchema({
                userId: _id,
                uniqueString: hashUniqueString,
                creates: Date.now(),
                expires: Date.now() + 18000000
            })

            newUserVerification
                .save()
                .then(() => {
                    transporter
                        .sendMail(mailOptions)
                        .then(() => {
                            /*res.json({
                                status: "Pending",
                                message: "Email xác nhận đã gửi"
                            })*/
                        })
                        .catch((err) => {
                            console.log(err);
                            res.json({
                                status: "Failed",
                                message: "Email xác nhận gửi thất bại"
                            })
                        })
                })
        })
        .catch(() => {
            res.json({
                status: "Failed",
                message: "Băm chuỗi thất bại"
            })
        })
    
    
}



class loginController {
    index(req, res) {
        const message1 = req.query.errorsignin || "";
        const message2 = req.query.errorsignup || "";
        res.render('login', {messagesignin: message1, messagesignup: message2})
    }

    async processSignup(req, res, next) {
        //res.send(req.body);
        const formData = req.body;
        await userSchema
            .findOne({ email: formData.email })
            .then((checkExist) => {
                if (checkExist) {
                    const errorMessage = 'Email đã đăng ký';
                    res.redirect('/login?errorsignup=' + encodeURIComponent(errorMessage));
                } else {
                    const saltRound = 10;
                    bcrypt
                        .hash(formData.password, saltRound)
                        .then((hashPassword) => {
                            formData.password = hashPassword;
                            const user = new userSchema({
                                username: formData.username,
                                email: formData.email,
                                password: hashPassword,
                                verified: false
                            }); 
                            user.save()
                                .then((result) => {
                                    const setting = new settingSchema({
                                        email: formData.email,
                                    });
                                    sendVerificationEmail(result, res);
                                    res.render('sendverifymail', {email: result.email});
                                    setting.save()
                                    .then()
                                    .catch(err =>{
                                        console.log("Error: ", err);
                                    })
                                    
                                })
                                .catch(err => {
                                    res.send('Đăng ký thất bại');
                                })
                        })
                        .catch((err) => {
                            console.log(err);
                            res.json({
                                status: "Failed",
                                message: "Băm mật khẩu thất bại"
                            })
                        })
                    
                }
            })
            .catch(error => {
                console.log('error', error)
                res.json({
                    status: "Failed",
                    message: "Lỗi trong khi kiểm tra email tồn tại"
                })
            })
        
    }

    async processSignin(req, res) {
        let {email, password} = req.body;
        await userSchema
            .find({email})
            .then(user => {
                if (user.length == 0) {
                    const errorMessage = 'Tài khoản không tồn tại';
                    console.log(user, !!user, !user)
                    res.redirect('/login?errorsignin=' + encodeURIComponent(errorMessage));
                } else {
                    console.log('user: ', user)
                    //check verify
                    if (!user[0].verified) {
                        const errorMessage = 'Email chưa xác thực';
                        res.redirect('/login?errorsignin=' + encodeURIComponent(errorMessage));
                    } else {
                        bcrypt
                            .compare(password, user[0].password)
                            .then(checkPassword => {
                                if (checkPassword) {
                                    if (req.session.isAuth) {
                                        res.redirect('/home');
                                    } else {
                                        req.session.user = user[0];
                                        req.session.type = "default";
                                        req.session.isAuth = true;
                                        res.redirect('/home');
                                    }
                                } else {
                                    const errorMessage = 'Sai mật khẩu';
                                    res.redirect('/login?errorsignin=' + encodeURIComponent(errorMessage));
                                }
                            })
                            .catch((err) => {
                                console.log("Error: ", err);
                                res.send('Đăng nhập thất bại');
                            })
                            
                    }
                    
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
                res.send('Lỗi trong khi kiểm tra người dùng có tồn tại không');
            }) 
    }

    processGoogleSiginCallback(req, res) {
        if (req.session.id) {
            res.redirect('/home');
        } else {
            req.session.isAuth = true;
            req.session.type = 'google';
            res.redirect('/home');
        }
        
    }
}
module.exports = new loginController;