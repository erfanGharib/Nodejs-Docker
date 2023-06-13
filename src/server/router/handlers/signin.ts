import { Request, Response } from "express";
import { __components } from "../../../index.js";
const path = require('path');

const getHandler_signin = (req: Request, res: Response) => {
    res.render(path.join(__components, 'authFrom.handlebars'), {
        title: 'SignIn',
        haveAnAccount: {
            text: 'Don\'t you have an account? ',
            link: 'signup'
        }
    });
}

export default {
    get: getHandler_signin,
};