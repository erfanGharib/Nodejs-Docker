import { __views } from "../index.js";
const express = require('express');
const contactUsRouter = express.Router();
const contactUsPresenter = require('../presenters/contactUsPresenter');

contactUsRouter.get('/', contactUsPresenter.get);
contactUsRouter.get('/sendMail', contactUsPresenter.sendMail);

export default contactUsRouter;