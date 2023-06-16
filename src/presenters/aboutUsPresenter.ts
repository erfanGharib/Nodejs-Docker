import { Request, Response } from "express";
import { __views } from "../index.js";
const path = require('path');

module.exports = {
    get: (req: Request, res: Response) => {
        res.render('aboutUs', {
            title: 'AboutUs',
        });
    }
}