"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var forbiddenRouter = express.Router();
var forbiddenPresenter = require('../presenters/forbiddenPresenter');
forbiddenRouter.get('/', forbiddenPresenter.get);
exports.default = forbiddenRouter;
//# sourceMappingURL=forbidden.js.map