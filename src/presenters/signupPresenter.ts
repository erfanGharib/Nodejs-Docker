import { Request, Response } from "express";
import { __components, __views } from "../index.js";
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

module.exports = {
    get: async (req: Request, res: Response) => {
        Handlebars.registerPartial(
            'components',
            String(fs.readFileSync(path.join(__components, 'authForm.handlebars')))
        );
    
        res.render('signup', {
            title: 'SignUp',
            haveAnAccount: {
                text: 'Don\'t you have an account? ',
                link: 'signin'
            },
        });
    },
    getUser: () => {

    },
}