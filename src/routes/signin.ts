import { __views } from "../index.js";
const express = require('express');
const signinRouter = express.Router();
const signinPresenter = require('../presenters/signinPresenter');

signinRouter.get('/', signinPresenter.get);
signinRouter.post('/createUser', signinPresenter.createUser);

export default signinRouter;

// const getHandler_signin = async (req: Request, res: Response) => {
//     const dbConnection = await new ManageDBDoc({
//         req,
//         res,
//         dbCollection: 'users'
//     }).connectToDatabase();
    
//     if(JSON.parse(JSON.stringify(req.cookies)).hasOwnProperty('User')) {
//         if (
//             req.cookies.User && 
//             req.cookies.User.httpOnly &&
//             await dbConnection.findOne({ _id: req.cookies.User })
//         ) {
//             dbConnection.closeConnection();
//             res.render(path.join(__views, '403.handlebars'), {
//                 title: '403 | Forbbiden'
//             });
//             return;
//         }
//     }

//     Handlebars.registerPartial(
//         'components',
//         String(fs.readFileSync(path.join(__components, 'authForm.handlebars')))
//     );

//     res.render(path.join(__views, 'signin.handlebars'), {
//         title: 'SignIn',
//         haveAnAccount: {
//             text: 'Don\'t you have an account? ',
//             link: 'signup'
//         },
//     });
// }
// const postHandler_signup = async (req: Request, res: Response) => {
//     const dbConnection = await new ManageDBDoc({
//         req,
//         res,
//         dbCollection: 'users'
//     }).connectToDatabase();

//     req.params['q'] === 'getUser' ?   
//         dbConnection.insertOne({
//             schema: authSchema,
//             fields: req.body?.data,
//         }) :
//         await dbConnection.findOne({ _id: req.body?._id })

//     dbConnection.closeConnection();
// }