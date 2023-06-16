import { __views } from "..";
import ManageDBDoc from "../utils/ManageDBDoc";
const path = require('path');
const fs = require('fs');
const allRoutes = fs.readdirSync(path.join(__dirname, '..', 'routes'))
const Handlebars = require("handlebars");

const checkUserStatus = async (req, res, next) => {
    const dbConnection = await new ManageDBDoc({
        req,
        res,
        dbCollection: 'users'
    }).connectToDatabase();

    if (JSON.parse(JSON.stringify(req.cookies)).hasOwnProperty('User')) {
        if (
            req.cookies.User &&
            req.cookies.User.httpOnly &&
            await dbConnection.findOne({ _id: req.cookies.User })
        ) {
            dbConnection.closeConnection();
            res.render(path.join(__views, '403.handlebars'), {
                title: '403 | Forbbiden'
            });
            res.locals.signedIn = true;
            return;
        }
    }
    res.locals.signedIn = false;

    /** pass all navbar links to handlebars layout based on @routesData */
    Handlebars.registerHelper('navbarLinks', ({ data }: { data: any }) => {
        let result = '';
        allRoutes
        .filter(v => !v.match(/map$/i))
        .forEach((route) => {
            const unexpectedRoutes = [
                'forbidden', 'notFound', 'index'
            ]
            if (unexpectedRoutes.some(route_ => route.includes(route_))) return;

            const resultCpy = route.replace('.js', '');
            result += `
            <a 
                href='/${resultCpy}' 
                class="${data?.root?.title?.toLowerCase().includes(resultCpy) && 'bg-blue-700'} capitalize md:ml-3 mb-3 md:mb-0 !bg-opacity-40 !border-opacity-60 border border-blue-600 hover:bg-blue-700 text-blue-100 py-2 px-3 text-sm transition-all"
            >
                ${resultCpy}
            </a>
        `
        })
        return result;
    })

    next();
}

export default checkUserStatus;