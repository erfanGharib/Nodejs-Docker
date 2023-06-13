import { Request, Response } from "express";
import { __components } from "../../../index.js";
const path = require('path');

const getHandler_signup = (req: Request, res: Response) => {
    res.render(path.join(__components, 'authFrom.handlebars'), {
        title: 'SignUp',
        haveAnAccount: {
            text: 'Already have an account? ',
            link: 'signin'
        }
    });
}

export default {
    get: getHandler_signup,
};