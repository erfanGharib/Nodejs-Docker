import { Request, Response } from "express";
import { __views } from "../../../index.js";
const path = require('path');

const getHandler_notFound = (req: Request, res: Response) => {
    res.status(404).render(path.join(__views, '404.handlebars'), {
        title: '404 | Not Found',
    });
}

export default {
    get: getHandler_notFound,
};