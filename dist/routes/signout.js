"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var signoutRouter = express.Router();
var signoutPresenter = require('../presenters/signoutPresenter');
signoutRouter.get('/', signoutPresenter.signout);
exports.default = signoutRouter;
//# sourceMappingURL=signout.js.map