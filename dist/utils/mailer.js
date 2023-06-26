"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailer = void 0;
var nodemailer = require('nodemailer');
require('dotenv').config();
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'erfangharib5@gmail.com',
        pass: process.env.EMAIL_PASS,
    }
});
var mailer = function (_a) {
    var text = _a.message, fullName = _a.fullName, email = _a.email;
    var mailOption = {
        from: 'erfangharib5@gmail.com',
        replyTo: 'erfangharib5@gmail.com',
        to: 'erfangharib5@gmail.com',
        subject: "Nodejs-Docker: ".concat(fullName, " ").concat(email),
        text: text
    };
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOption, function (err, info) {
            if (err) {
                console.error(err);
                return reject();
            }
            console.log("Message sent: %s", info.response);
            resolve();
        });
    });
};
exports.mailer = mailer;
//# sourceMappingURL=mailer.js.map