import { Request, Response } from "express";
import { __views } from "..";
const path = require('path');

module.exports = {
    get: (req: Request, res: Response) => {
        res.render('home', {
            title: 'Home',
        });
    }
}