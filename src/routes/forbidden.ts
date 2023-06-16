import { __views } from "../index.js";
const express = require('express');
const forbiddenRouter = express.Router();
const forbiddenPresenter = require('../presenters/forbiddenPresenter');

forbiddenRouter.get('/', forbiddenPresenter.get);

export default forbiddenRouter;