const { directories, routes_$arr } = require('../index.js');

const createRoutes =(app)=> {
    routes_$arr.forEach((value, index) => {
        app.get(value, (req, res) => {
            res.sendFile(directories + '/client/index.html');
        });
    });
    require('./file-path').filePath_$func(app);
    require('./api').createAPI(app);
};

module.exports = { createRoutes };