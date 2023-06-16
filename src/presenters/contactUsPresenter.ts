import { Request, Response } from "express";
import { mailer } from '../utils/mailer.js'
import { __views } from "../index.js";
import { contactUsModel } from "../models/contactUsModel.js";
const path = require('path');

module.exports = {
    get: (req: Request, res: Response) => {
        res.render('contactUs', {
            title: 'ContactUs',
        });
    },
    sendMail: (req: Request, res: Response) => {
        const { error, value } = contactUsModel.validate(req.body?.data);
        if(error) return res.send(error.message);
        
        mailer(value)
        .then(() => {
            res.json({message: 'Message Sent'});
        })
    }
}