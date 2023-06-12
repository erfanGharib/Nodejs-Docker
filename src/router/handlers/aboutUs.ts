import { Request, Response } from "express";
import { __views } from "../../..";
const path = require('path');

const handler_aboutUs = (req: Request, res: Response) => {
    res.render(path.join(__views, 'aboutUs.handlebars'), {
        title: 'AboutUs',
    });
}

export default handler_aboutUs;