"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Handlebars = require("handlebars");
var path = require('path');
var handler_aboutUs = function (req, res) {
    Handlebars.registerHelper('layout', function () {
        return new Handlebars.SafeString('this is layout');
    });
    Handlebars.registerHelper('title', function () {
        return 'AboutUs';
    });
    res.render(path.join(__dirname, '../..', 'views', 'aboutUs.handlebars'));
};
exports.default = handler_aboutUs;
//# sourceMappingURL=aboutUs.js.map