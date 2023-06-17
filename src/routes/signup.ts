const express = require('express');
const signupRouter = express.Router();
const signupPresenter = require('../presenters/signupPresenter');

signupRouter.get('/', signupPresenter.get);
signupRouter.post('/createUser', signupPresenter.createUser);

export default signupRouter;