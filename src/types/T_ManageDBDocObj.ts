import { Request, Response } from "express";

export class T_ManageDBDocObj {
    req: Request;
    res: Response;
    // data?: {
    //     schema: any;
    //     fields: {
    //         email: string;
    //         password: string;
    //     },
    // };
    // dbQueries?: {
    //     find: any;
    // };
    dbCollection: 'users';
}