import { __views } from "../index.js";
const express = require('express');
const aboutUsRouter = express.Router();
const aboutUsPresenter = require('../presenters/aboutUsPresenter');

aboutUsRouter.get('/', aboutUsPresenter.get);

export default aboutUsRouter;