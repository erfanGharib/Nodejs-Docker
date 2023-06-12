import { Request, Response } from "express";
import { __views } from "../../..";
const path = require('path');

const handler_notFound = (req: Request, res: Response) => {
    res.status(404).render(path.join(__views, '404.handlebars'), {
        title: '404 | Not Found',
    });
}

export default handler_notFound;