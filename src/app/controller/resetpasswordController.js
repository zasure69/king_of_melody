//import thư viện
const {v4: uuidv4} = require('uuid')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const userSchema = require('../models/User');
const passwordResetSchema = require('../models/PasswordReset');

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


const sendResetEmail = ({_id, email}, redirectUrl, res) => {
    const resetString = uuidv4() + _id;
    passwordResetSchema
        .deleteOne({userId: _id})
        .then((result) => {
            //xóa thành công
            // gửi email reset password
            const mailOptions = {
                from: "king.of.melody.nhom.11@gmail.com",
                to: email,
                subject: "Đặt lại mật khẩu",
                html: `
                <p>Chúng tôi biết rằng bạn đã quên mật khẩu. Vui lòng nhấn vào link sau để đặt lại mật khẩu cho tài khoản của bạn</p>
                <a href="${
                    redirectUrl + "/" + _id + "/" + resetString 
                }">Nhấn vào đây</a>
                <p>Link này sẽ <b>hết hạn sau 30 phút</b></p>
                `
            }

            const saltRound = 10;
            bcrypt
                .hash(resetString, saltRound)
                .then((hashResetString) => {
                    //set values in password reset collection
                    const newPassWordReset = new passwordResetSchema({
                        userId: _id,
                        resetString: hashResetString,
                        creates: Date.now(),
                        expires: Date.now() + 1800000
                    })

                    newPassWordReset
                        .save()
                        .then(() => {
                            transporter
                                .sendMail(mailOptions)
                                .then(() => {
                                    res.render('resetpasswordsend', {email: email, layout: false})
                                })
                                .catch(err => {
                                    console.log("error: ", err)
                                    res.json({
                                        status: 'Failed',
                                        message: 'Lỗi trong khi gửi mail reset'
                                    })
                                })
                        })
                        .catch(err => {
                            console.log('error: ', err);
                            res.json({
                                status: 'Failed',
                                message: 'Lỗi xảy ra khi lưu resetpassword lên collection'
                            })
                        })
                })
                .catch(err => {
                    console.log("error: ", err);
                    res.json({
                        status: 'Failed',
                        message: 'Lỗi xảy ra trong khi băm resetString'
                    })
                })
        })
        .catch(err => {
            console.log("error: ", err);
            res.json({
                status: 'Failed',
                message: 'Xóa những bản resetpassword tồn tại thất bại'
            })
        })
}

class resetPasswordController {
    index(req, res) {
        res.render('resetpassword')
    }

    //password reset stuff
    process (req, res) {
        const {email} = req.body;
        const redirectUrl = 'https://localhost:3000/resetPassword/change'
        //check email exist
        userSchema
            .find({email})
            .then((data) => {
                if (data.length) {
                    //email tồn tại

                    //kiểm tra email đã verified chưa
                    if (!data[0].verified) {
                        res.json({
                            status : 'Failed',
                            message: 'Email chưa xác nhận'
                        })
                    } else {
                        //email đã verified
                        sendResetEmail(data[0], redirectUrl, res);
                        
                    }
                } else {
                    res.json({
                        status: "Failed",
                        message: "Email không tồn tại "
                    })
                }
            })
            .catch(error => {
                console.log("error: ", error);
                res.send('Lỗi xảy ra khi kiểm tra email có tồn tại hay không')
            })

    }
    
    changeView(req, res) {
        let userId = req.params.userId
        let resetString = req.params.resetString
        
        res.render('changepassword', {userId, resetString, layout: false})
    }

    change(req, res) {
        let newPassword = req.body.password
        let userId = req.params.userId
        let resetString = req.params.resetString
        console.log(userId, resetString, newPassword)
        
        passwordResetSchema
            .find({userId})
            .then(result => {
                if (result.length) {
                    //yêu cầu tồn tại
                    const expires = result[0].expires

                    if (expires < Date.now()) {
                        passwordResetSchema
                            .deleteOne({userId})
                            .then(() => {
                                res.json({
                                    status: 'Failed',
                                    message: 'Link xác nhận reset mật khẩu hết hạn'
                                })
                            })
                            .catch(err => {
                                console.log("error: ", err);
                                res.json({
                                    status: "Failed",
                                    message: "Lỗi xảy ra khi xóa yêu cầu reset mật khẩu trong collection"
                                })
                            })
                    } else {
                        bcrypt
                            .compare(resetString, result[0].resetString)
                            .then(result => {
                                if (result) {
                                    const saltRound = 10;
                                    bcrypt
                                        .hash(newPassword, saltRound)
                                        .then((hashNewPassword) => {
                                            userSchema
                                                .updateOne({_id: userId}, {password: hashNewPassword})
                                                .then(() => {
                                                    passwordResetSchema
                                                        .deleteOne({userId})
                                                        .then(() => {
                                                            // res.json({
                                                            //     status: 'Success',
                                                            //     message: 'Mật khẩu thay đổi thành công'
                                                            // })
                                                            res.render('changepasswordsuccess', {layout: false})
                                                        })
                                                        .catch(err => {
                                                            console.log("error: ", err)
                                                            res.json({
                                                                status: 'Failed',
                                                                message: 'Lỗi xảy ra khi hoàn thành reset mật khẩu'
                                                            })
                                                        })
                                                })
                                                .catch(err => {
                                                    console.log("error: ", err)
                                                    res.json({
                                                        status: 'Failed',
                                                        message: 'Cập nhật mật khẩu thất bại'
                                                    })
                                                    
                                                })
                                        })
                                        .catch(err => {
                                            console.log("error: ", err);
                                            res.json({
                                                status: 'Failed',
                                                message: 'Lỗi xảy ra khi băm mật khẩu mới'
                                            })
                                        })
                                } else {
                                    res.json({
                                        status: 'Failed',
                                        message: 'resetString không khớp'
                                    })
                                }
                            })
                            .catch(err => {
                                console.log("error: ", err)
                                res.json({
                                    status: 'Failed',
                                    message: 'So sánh resetString thất bại'
                                })
                            })
                    }
                } else {
                    res.json({
                        status: 'Failed',
                        message: 'yêu cầu reset mật khẩu không tồn tại'
                    })
                }
            })
            
    }

    

    
}

module.exports = new resetPasswordController;