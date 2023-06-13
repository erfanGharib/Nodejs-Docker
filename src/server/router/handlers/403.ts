import { Request, Response } from "express";
import { __views } from "../../../index.js";
const path = require('path');

const handler_accessDenied = (req: Request, res: Response) => {
    res.status(403).render(path.join(__views, '403.handlebars'), {
        title: '403 | Access Denied',
    });
}

export default {
    get: handler_accessDenied,
};