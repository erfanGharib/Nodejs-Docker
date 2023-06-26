const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'erfangharib5@gmail.com',
        pass: process.env.EMAIL_PASS,
    }
});
export const mailer = (
    { message: text, fullName, email }: 
    { message: string, fullName: string, email: string }
) => {
    const mailOption = {
        from: 'erfangharib5@gmail.com',
        replyTo: 'erfangharib5@gmail.com',
        to: 'erfangharib5@gmail.com',
        subject: `Nodejs-Docker: ${fullName} ${email}`,
        text
    };

    return new Promise((resolve: any, reject: any) => {
        transporter.sendMail(mailOption, (err, info) => {
            if (err) {
                console.error(err);
                return reject();
            }
            console.log("Message sent: %s", info.response);
            resolve();
        });
    })
}