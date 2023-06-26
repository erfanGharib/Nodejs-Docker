"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var signinRouter = express.Router();
var signinPresenter = require('../presenters/signinPresenter');
signinRouter.get('/', signinPresenter.get);
signinRouter.post('/getUser', signinPresenter.getUser);
exports.default = signinRouter;
//# sourceMappingURL=signin.js.map