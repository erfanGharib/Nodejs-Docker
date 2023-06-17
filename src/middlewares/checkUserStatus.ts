import { ObjectId } from "mongodb";
import { __views } from "..";
import ManageDBDoc from "../utils/ManageDBDoc";
const path = require('path');
const fs = require('fs');
const allRoutes = fs.readdirSync(path.join(__dirname, '..', 'views'))
const Handlebars = require("handlebars");

const checkUserStatus = async (req, res, next) => {
    const dbConnection = await new ManageDBDoc({
        req,
        res,
        dbCollection: 'users'
    }).connectToDatabase();

    if ((req.cookies.User ?? null) && await dbConnection.findOne({ _id: new ObjectId(req.cookies.User) })) {
        dbConnection.closeConnection();
        res.locals.signedIn = true;
    }
    else res.locals.signedIn = false;

    /** pass all navbar links to handlebars layout based on @routes */
    Handlebars.registerHelper('navbarLinks', ({ data }: { data: any }) => {
        let result = '';
        const unexpectedRoutes = [
            '403', '404', 'index'
        ];

        allRoutes
            .filter(v => (
                !unexpectedRoutes.some(route_ => v.includes(route_)) &&
                !res.locals.signedIn &&
                v.match(/\.\w+$/)
            ))
            .forEach((route) => {
                const resultCpy = route.replace(/\.\w+$/, '');
                result += (`
                    <a 
                        href='/${resultCpy}' 
                        class="${data?.root?.title?.toLowerCase().includes(resultCpy) && 'bg-blue-700'} capitalize md:ml-3 mb-3 md:mb-0 !bg-opacity-40 !border-opacity-60 border border-blue-600 hover:bg-blue-700 text-blue-100 py-2 px-3 text-sm transition-all"
                    >
                        ${resultCpy}
                    </a>
                `)
            })
        return result;
    })

    next();
}

export default checkUserStatus;