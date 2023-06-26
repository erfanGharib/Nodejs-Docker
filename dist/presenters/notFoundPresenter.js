"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
module.exports = {
    get: function (req, res) {
        res.status(404).render('404', {
            title: '404 | Not Found',
        });
    }
};
//# sourceMappingURL=notFoundPresenter.js.map