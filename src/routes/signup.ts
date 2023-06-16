const express = require('express');
const signupRouter = express.Router();
const signupPresenter = require('../presenters/signupPresenter');

signupRouter.get('/', signupPresenter.get);
// signupRouter.post('/createUser', signupPresenter.createUser);

export default signupRouter;

// const getHandler_signup = (req: Request, res: Response) => {
//     Handlebars.registerPartial(
//         'components', 
//         String(fs.readFileSync(path.join(__components, 'authForm.handlebars')))
//     );

//     res.render(path.join(__views, 'signup.handlebars'), {
//         title: 'SignUp',
//         haveAnAccount: {
//             text: 'Already have an account? ',
//             link: 'signup'
//         },
//     });
// }
// const postHandler_signup = (req: Request, res: Response) => {
//     // const { error, value } = schema.validate(req.body?.data);
//     // if(error) return res.send(error.message);

//     new ManageDBDoc({
//         req,
//         res,
//         // dbQueries: {
//         //     find: {},
//         // },
//         // data: {
//         //     schema: authSchema,
//         //     fields: req.body?.data,
//         // },
//         dbCollection: 'users'
//     }).connectToDatabase();
// }

// export default {
//     get: getHandler_signup,
//     post: postHandler_signup
// };