"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var handler_contactUs = function (req, res) {
    res.render(path.join(__dirname, '../..', 'views', 'contactUs.handlebars'));
};
exports.default = handler_contactUs;
//# sourceMappingURL=contactUs.js.map