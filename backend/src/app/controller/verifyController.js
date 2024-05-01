const UserVerification = require("../models/UserVerification");
const User = require("../models/User");
const bcrypt = require("bcrypt");

class verifyController {
    index(req, res, next) {
        let userId = req.params.userId;
        let uniqueString = req.params.uniqueString;
        console.log(userId, uniqueString);
        UserVerification
            .find({userId})
            .then((result) => {
                if (result.length > 0) {
                    const {expires} = result[0];
                    const hashUniqueString = result[0].uniqueString;
                    // kiểm tra unique string hết hạn chưa
                    if (expires < Date.now()) {
                        UserVerification
                            .deleteOne({_id: userId})
                            .then(() => {
                                let message = "Link xác thực hết hạn";
                                res.send(message);
                            })
                            .catch((err) => {
                                let message = "Link xác thực hết hạn";
                                res.send(message);
                            })
                    } else {
                        // so sánh hash unique string
                        bcrypt
                            .compare(uniqueString, hashUniqueString)
                            .then((result) => {
                                if (result) {
                                    User
                                        .updateOne({_id: userId}, {verified: true})
                                        .then(() => {
                                            UserVerification
                                                .deleteOne({userId})
                                                .then(() => {
                                                    // gửi giao diện xác thực thành công
                                                    res.send('xác thực thành công');
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                    let message = "lỗi xảy ra khi đang hoàn tất quá trình xác thực";
                                                    res.send(message);
                                                })
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            let message = "lỗi xảy ra khi cập nhật tình trạng xác thực";
                                            res.send(message);
                                        })
                                } else {
                                    // khong thoa man
                                    let message = `alert('Link xác thực không hợp lệ')`;
                                    res.send(message);
                                    
                                }
                            }) 
                    }
                } else {
                    let message = `alert('Tài khoản không tồn tại hoặc đã được xác nhận rồi')`;
                    res.send(message);
                }
            })
            .catch((err) => {
                console.log("lỗi",err);
                let message = "Lỗi trong khi kiểm tra xác thực";
                res.send(message);
            })
    }
}

module.exports = new verifyController;