"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
module.exports = {
    get: function (req, res) {
        res.status(403).render('403', {
            title: '403 | Forbidden',
        });
    }
};
//# sourceMappingURL=forbiddenPresenter.js.map