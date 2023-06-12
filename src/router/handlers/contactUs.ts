import { Request, Response } from "express";
import { __views } from "../../..";
const path = require('path');

const handler_contactUs = (req: Request, res: Response) => {
    res.render(path.join(__views, 'contactUs.handlebars'), {
        title: 'ContactUs',
    });
}

export default handler_contactUs;