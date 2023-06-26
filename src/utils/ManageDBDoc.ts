import { Request, Response } from "express";
import { InsertOneResult, MongoClient } from "mongodb";
require('dotenv').config();

type T_DbQuery = {
    [key: string]: any
}
type T_Data = {
    schema: any,
    fields: any
}
type types = {
    req: Request,
    res: Response,
    dbCollection: 'users',
}
export type T_User = { email: string; password: string; _id: any; };

class ManageDBDoc {
    req: Request;
    res: Response;
    dbCollection: string;

    constructor({
        req,
        res,
        dbCollection,
    }: types) {
        this.req = req;
        this.res = res;
        this.dbCollection = dbCollection;
    }
    private dbo = null;
    private db = null;

    private throwErr(error: Error, cb: () => void) {
        if (error) {
            this.res.status(417).send(error.message);
            console.error(new Error(error.message));
            return cb();
        }
    }
    public setCookie(name: string, data: any) {
        const date = new Date();
        date.setDate(date.getDate() + 2);

        this.res.cookie(name, data, {
            httpOnly: true,
            expires: date,
            maxAge: 48 /* hour */ * 60 /* minute */ * 60 /* second */
        })
    }
    public async findOne(query: T_DbQuery, sendResponse: boolean): Promise<T_User | {}> {
        const data = (
            query?.schema?.validate(query?.fields) ??
            { error: null, value: query }
        );
        let resultCpy = {};

        await new Promise((resolve: any) => {
            this.throwErr(data?.error, resolve)

            this.dbo.findOne(data?.value, (err, result) => {
                if (err) console.error(new Error(err));
                else if (Object.entries(result ?? {}).length !== 0) {
                    resultCpy = result;
                    sendResponse && this.setCookie('User', String(result?._id))
                    sendResponse && this.res.send('Signed In Successfuly')
                    resolve();
                }
                else {
                    sendResponse && this.res.status(417).send('Invalid Email or Password')
                    resolve()
                }
            });
        })

        return resultCpy;
    }
    public async insertOne(data: T_Data) {
        const { error, value } = data.schema.validate(data.fields);
        const user = await this.findOne({ email: value.email }, false);

        return new Promise((resolve: any) => {
            this.throwErr(error, resolve)

            if (Object.entries(user ?? {}).length === 0) {
                this.dbo.insertOne(data.fields, (err, result: InsertOneResult) => {
                    if (err) return console.error(new Error(err));

                    this.setCookie('User', String(result.insertedId))
                    this.res.send('Signed Up Successfuly!')
                    resolve()
                });
            }
            else {
                this.res.status(409).send('User Already Exist With this Email!')
                resolve()
            }
        })
    }

    public async connectToDatabase() {
        await new Promise((resolve: any) => {
            MongoClient.connect(process.env.DB_URL, (err, db) => {
                if (err)
                    return this.res.send(err);
                this.db = db;
                this.dbo = db.db(process.env.DB_NAME).collection(this.dbCollection);

                resolve();
            });
        })
        return this;
    }
    public closeConnection() {
        this.db.close();
    }
}

export default ManageDBDoc;