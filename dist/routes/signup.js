"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var signupRouter = express.Router();
var signupPresenter = require('../presenters/signupPresenter');
signupRouter.get('/', signupPresenter.get);
signupRouter.post('/createUser', signupPresenter.createUser);
exports.default = signupRouter;
//# sourceMappingURL=signup.js.map