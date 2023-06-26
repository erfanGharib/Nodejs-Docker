"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var indexRouter = express.Router();
var indexPresenter = require('../presenters/indexPresenter');
indexRouter.get('/', indexPresenter.get);
exports.default = indexRouter;
//# sourceMappingURL=index.js.map