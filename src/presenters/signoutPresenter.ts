import { Request, Response } from "express";
import ManageDBDoc from "../utils/ManageDBDoc.js";
import { __components, __views } from "../index.js";

module.exports = {
    signout: async (req: Request, res: Response) => {
        res.clearCookie('User').redirect('/')
    }
}