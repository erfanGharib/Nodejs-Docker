import { Request, Response } from "express";
import { mailer } from '../utils/mailer.js'
import { __views } from "../index.js";
import { contactUsModel } from "../models/contactUsModel.js";

module.exports = {
    get: (req: Request, res: Response) => {
        res.render('contactUs', {
            title: 'ContactUs',
        });
    },
    sendMail: (req: Request, res: Response) => {
        const { error, value } = contactUsModel.validate(req.body);
        if(error) return res.status(400).send(error.message);
        
        mailer(value)
        .then(() => {
            res.send('Message Sent');
        })
        .catch(() => {
            res.status(500).send('Failed to Send Message');
        })
    }
}