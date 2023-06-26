"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var notFoundRouter = express.Router();
var notFoundPresenter = require('../presenters/notFoundPresenter');
notFoundRouter.get('/*', notFoundPresenter.get);
exports.default = notFoundRouter;
//# sourceMappingURL=notFound.js.map