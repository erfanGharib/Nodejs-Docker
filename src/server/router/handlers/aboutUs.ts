import { Request, Response } from "express";
import { __views } from "../../../index.js";
const path = require('path');

const getHandler_aboutUs = (req: Request, res: Response) => {
    res.render(path.join(__views, 'aboutUs.handlebars'), {
        title: 'AboutUs',
    });
}

export default {
    get: getHandler_aboutUs,
};