import { Request, Response } from "express";
import ManageDBDoc from "../utils/ManageDBDoc.js";
import { __components, __views } from "../index.js";
import { userModel } from "../models/userModel.js";
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

module.exports = {
    get: async (req: Request, res: Response) => {
        if (res.locals.signedIn) return res.redirect('/403')

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
    createUser: async (req: Request, res: Response) => {
        const dbConnection = await new ManageDBDoc({
            req,
            res,
            dbCollection: 'users'
        }).connectToDatabase();

        await dbConnection.insertOne({
            schema: userModel,
            fields: req.body,
        })
        
        dbConnection.closeConnection();

    }
}