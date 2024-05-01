const userSchema = require('../models/User');
//lib hash
const bcrypt = require('bcrypt');
const passwordResetSchema = require('../models/PasswordReset');
const userVerificationSchema = require('../models/UserVerification');
//email handler
const nodemailer = require('nodemailer');
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
        user: "haun11723@gmail.com",
        pass: "uvdskfujhaxcwwzw"
    },
    tls: {
        rejectUnauthorized: true
    }
});

const sendVerificationEmail = ({_id, email}, res) => {
    const currentUrl = "http://localhost:3000";
    const uniqueString = uuidv4() + _id;
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
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
        res.render('login')
    }

    async processSignup(req, res, next) {
        //res.send(req.body);
        const formData = req.body;
        await userSchema
            .findOne({ email: formData.email })
            .then((checkExist) => {
                if (checkExist) {
                    res.json({
                        status: "Failed",
                        message: "Email đã đăng ký"
                    })
                } else {
                    const saltRound = 10;
                    bcrypt
                        .hash(formData.password, saltRound)
                        .then((hashPassword) => {
                            formData.password = hashPassword;
                            const user = new userSchema(formData);
                            user.save()
                                .then((result) => {
                                    sendVerificationEmail(result, res);
                                    res.redirect('/login');
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
                if (!user) {
                    res.json({
                        status: "Failed",
                        message: "Tài khoản không tồn tại"
                    })
                } else {
                    
                    //check verify
                    if (!user[0].verified) {
                        res.json({
                            status: "Failed",
                            message: "Email chưa xác thực"
                        })
                    } else {
                        bcrypt
                            .compare(password, user[0].password)
                            .then(checkPassword => {
                                if (checkPassword) {
                                    res.redirect('/');
                                } else {
                                    res.send('Sai mật khẩu');
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
}

module.exports = new loginController;