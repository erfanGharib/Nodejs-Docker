import { Request, Response } from "express";
import { __views } from "../../../index.js";
const path = require('path');

const getHandler_home = (req: Request, res: Response) => {
    res.render(path.join(__views, 'home.handlebars'), {
        title: 'Home',
    });
}

export default {
    get: getHandler_home,
};