import { __views } from "../index.js";
const express = require('express');
const signinRouter = express.Router();
const signinPresenter = require('../presenters/signinPresenter');

signinRouter.get('/', signinPresenter.get);
signinRouter.post('/getUser', signinPresenter.getUser);

export default signinRouter;