import { Request, Response } from "express";
import ManageDBDoc from "../utils/ManageDBDoc.js";
import { __components, __views } from "../index.js";
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

module.exports = {
    get: async (req: Request, res: Response) => {
        const dbConnection = await new ManageDBDoc({
            req,
            res,
            dbCollection: 'users'
        }).connectToDatabase();
        console.log(req.cookies);
        
        if(JSON.parse(JSON.stringify(req.cookies)).hasOwnProperty('User')) {
            if (
                req.cookies.User && 
                req.cookies.User.httpOnly &&
                await dbConnection.findOne({ _id: req.cookies.User })
            ) {
                dbConnection.closeConnection();
                // res.render('403.handlebars', {
                //     title: '403 | Forbbiden'
                // });
                return;
            }
        }
    
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
    getUser: () => {

    },
    createUser: async (req: Request, res: Response) => {
        const dbConnection = await new ManageDBDoc({
            req,
            res,
            dbCollection: 'users'
        }).connectToDatabase();
    
        // req.params['q'] === 'getUser' ?   
        //     dbConnection.insertOne({
        //         schema: authSchema,
        //         fields: req.body?.data,
        //     }) :
        //     await dbConnection.findOne({ _id: req.body?._id })
    
        dbConnection.closeConnection();
    }
}