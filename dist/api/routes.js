"use strict";
var _a = require('../../index.js'), directories = _a.directories, routes_$arr = _a.routes_$arr;
var createRoutes = function (app) {
    routes_$arr.forEach(function (value, index) {
        app.get(value, function (req, res) {
            res.sendFile(directories + '/client/index.html');
        });
    });
    require('./file-path').filePath_$func(app);
    require('../../server/api.js').createAPI(app);
};
module.exports = { createRoutes: createRoutes };
//# sourceMappingURL=routes.js.map