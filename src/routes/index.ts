import { __views } from "../index.js";
const express = require('express');
const indexRouter = express.Router();
const indexPresenter = require('../presenters/indexPresenter');

indexRouter.get('/', indexPresenter.get);

export default indexRouter;