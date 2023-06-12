"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var handler_login = function (req, res) {
    res.render(path.join(__dirname, '../..', 'views', 'signin.handlebars'));
};
exports.default = handler_login;
//# sourceMappingURL=signin.js.map