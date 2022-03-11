const { directories, routes_$arr, port } = require('../main.js');
const express = require('express');
const app = express();
app.use(express.json());

routes_$arr.forEach((value, index) => {
    app.get(value, (req, res) => {
        res.sendFile(directories + '/client/index.html');
    });
});
require('./file-path').filePath_$func(app);
require('./api').createAPI(app);

app.listen(port, err => {
    if(err) throw err;
    console.log(`server listen on port ${port}`);
});