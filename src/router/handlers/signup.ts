import { Request, Response } from "express";
import { __components } from "../../..";
const path = require('path');

const handler_signup = (req: Request, res: Response) => {
    res.render(path.join(__components, 'from.handlebars'), {
        title: 'SignUp',
        haveAnAccount: {
            text: 'Already have an account? ',
            link: 'signin'
        }
    });
}

export default handler_signup;