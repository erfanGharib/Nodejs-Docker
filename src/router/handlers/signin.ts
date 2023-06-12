import { Request, Response } from "express";
import { __components } from "../../..";
const path = require('path');

const handler_signin = (req: Request, res: Response) => {
    res.render(path.join(__components, 'from.handlebars'), {
        title: 'SignIn',
        haveAnAccount: {
            text: 'Don\'t you have an account? ',
            link: 'signup'
        }
    });
}

export default handler_signin;