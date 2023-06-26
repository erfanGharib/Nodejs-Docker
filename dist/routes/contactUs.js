"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var contactUsRouter = express.Router();
var contactUsPresenter = require('../presenters/contactUsPresenter');
contactUsRouter.get('/', contactUsPresenter.get);
contactUsRouter.post('/sendMail', contactUsPresenter.sendMail);
exports.default = contactUsRouter;
//# sourceMappingURL=contactUs.js.map