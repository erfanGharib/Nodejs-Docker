import { __views } from "../index.js";
const express = require('express');
const notFoundRouter = express.Router();
const notFoundPresenter = require('../presenters/notFoundPresenter');

notFoundRouter.get('/*', notFoundPresenter.get);

export default notFoundRouter;
