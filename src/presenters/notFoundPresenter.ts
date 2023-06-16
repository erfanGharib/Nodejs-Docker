import { Request, Response } from "express";
import { __views } from "..";
const path = require('path');

module.exports = {
    get: (req: Request, res: Response) => {
        res.status(404).render('404', {
            title: '404 | Not Found',
        });
    }
}