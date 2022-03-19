const express = require('express');
const app = express();
// const { createRoutes } = require('./server/routes');
const PORT = process.env.PORT || 8000;
const directories = __dirname;
const databaseName = 'fullstack-practise';
const dbUrl = 'mongodb://localhost:27017/';
const routes_$arr = [
    '/',
    '/about-us',
    '/contact-us',
    '/sign-up',
    '/log-in',
];

routes_$arr.forEach((value, index) => {
    app.get(value, (req, res) => {
        res.sendFile(directories + '/client/index.html');
    });
});

module.exports = {
    directories, routes_$arr, dbUrl, databaseName
}

require('./server/file-path').filePath_$func(app);
require('./server/api').createAPI(app);

app.use(express.json())
   .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// createRoutes(app);
// express()
//   .use(express.static(path.join(__dirname, 'client')))
//   .use(express.json())
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('index.html'))
//   .get('/cool', (req, res) => res.send(cool()))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));
