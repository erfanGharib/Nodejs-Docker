const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const databaseName = 'fullstack-practise';
const dbUrl = 'mongodb://localhost:27017/';
const routes_$arr = [
    '/',
    '/about-us',
    '/contact-us',
    '/sign-up',
    '/log-in',
];

module.exports = {
    routes_$arr, dbUrl, databaseName
}
console.log('worked 2');

const startApp = async () => {
    console.log('worked 1');
    //await require('mongodb').MongoClient.connect(dbUrl, (err, db) => {
    //    if (err) throw err;
    //    console.log(`${databaseName} database created!`);
    //    const dName = db.db(databaseName);
    //    dName.createCollection('users', (err, res) => {
    //        if (err) throw err;
    //        console.log('collection created!');
    //    });
    //});
    
    await routes_$arr.forEach((value, index) => {
        app.get(value, (req, res) => {
            res.sendFile(__dirname + '/client/index.html');
        });
    });
    
    await require('./server/api').createAPI(app);

    await app
      .use(express.static(__dirname + '/client'))
      .use(express.json())
      .set('view engine', 'ejs')
      .listen(PORT, () => console.log(`Listening on ${ PORT }`));
};

startApp();
// createRoutes(app);
// express()
//   .use(express.static(path.join(__dirname, 'client')))
//   .use(express.json())
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('index.html'))
//   .get('/cool', (req, res) => res.send(cool()))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));
