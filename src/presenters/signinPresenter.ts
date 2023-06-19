import { Request, Response } from "express";
import { __components, __views } from "../index.js";
import { userModel } from "../models/userModel.js";
import ManageDBDoc from "../utils/ManageDBDoc.js";
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

module.exports = {
    get: async (req: Request, res: Response) => {
        if (res.locals.signedIn) return res.redirect('/403');

        Handlebars.registerPartial(
            'components',
            String(fs.readFileSync(path.join(__components, 'authForm.handlebars')))
        );

        res.render('signin', {
            title: 'SignIn',
            haveAnAccount: {
                text: 'Already have an account? ',
                link: 'signup'
            },
        });
    },
    getUser: async (req: Request, res: Response) => {
        const dbConnection = await new ManageDBDoc({
            req,
            res,
            dbCollection: 'users'
        }).connectToDatabase();

        await dbConnection.findOne({
            schema: userModel,
            fields: req.body,
        }, true)

        dbConnection.closeConnection();
    },
}