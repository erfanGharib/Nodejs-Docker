"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var aboutUsRouter = express.Router();
var aboutUsPresenter = require('../presenters/aboutUsPresenter');
aboutUsRouter.get('/', aboutUsPresenter.get);
exports.default = aboutUsRouter;
//# sourceMappingURL=aboutUs.js.map