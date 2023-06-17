const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'erfan.gh.work@gmail.com',
        pass: process.env.EMAIL_PASS,
    }
});
export const mailer = (
    { message: text, fullName, email }: 
    { message: string, fullName: string, email: string }
) => {
    const mailOption = {
        from: 'erfan.gh.work@gmail.com',
        replyTo: 'erfan.gh.work@gmail.com',
        to: 'erfan.gh.work@gmail.com',
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