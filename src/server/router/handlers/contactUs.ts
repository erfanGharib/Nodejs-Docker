import { Request, Response } from "express";
import Joi = require("joi");
import { __views } from "../../../index.js";
import { sendMail } from '../../utils/sendMail.js'
const path = require('path');

const schema = Joi.object({
    message: Joi
        .string()
        .required(),
    fullName: Joi
        .string()
        .required(),
    email: Joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
})

const getHandler_contactUs = (req: Request, res: Response) => {
    res.render(path.join(__views, 'contactUs.handlebars'), {
        title: 'ContactUs',
    });
}
const postHandler_contactUs = (req: Request, res: Response) => {
    const { error, value } = schema.validate(req.body?.data);
    if(error) return res.send(error.message);
    
    console.log('sent');
    
    sendMail(value)
    .then(() => {
        res.json({message: 'Message Sent'});
    })
}

export default {
    get: getHandler_contactUs,
    post: postHandler_contactUs
};