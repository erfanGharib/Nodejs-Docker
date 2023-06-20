const express = require('express');
const signoutRouter = express.Router();
const signoutPresenter = require('../presenters/signoutPresenter');

signoutRouter.get('/', signoutPresenter.signout);

export default signoutRouter;