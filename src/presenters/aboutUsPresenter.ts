import { Request, Response } from "express";
import { __views } from "../index.js";

module.exports = {
    get: (req: Request, res: Response) => {
        res.render('aboutUs', {
            title: 'AboutUs',
        });
    }
}