import { Request, Response } from "express";
import { __views } from "..";
const path = require('path');

module.exports = {
    get: (req: Request, res: Response) => {
        res.status(403).render('403', {
            title: '403 | Forbidden',
        });
    }
}