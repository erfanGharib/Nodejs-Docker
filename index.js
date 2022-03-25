const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const databaseName = 'fullstack-practise';
const dbUrl = 'mongodb://localhost:27017/';
const bodyParser = require('body-parser');
const routes_$arr = [
    '/',
    '/about-us',
    '/contact-us',
    '/sign-up',
    '/log-in',
];

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

module.exports = {
    routes_$arr, dbUrl, databaseName
}

const startApp = async () => {
    await require('mongodb').MongoClient.connect(dbUrl, (err, db) => {
        if (err) throw err;
        console.log(`${databaseName} database created!`);
        const dName = db.db(databaseName);
        dName.createCollection('users', (err, res) => {
            if (err) throw err;
            console.log('collection created!');
        });
    });

    await routes_$arr.forEach((value, index) => {
        app.get(value, (req, res) => {
            res.sendFile(__dirname + '/client/index.html');
        });
    });

    await require('./server/api').createAPI(app, __dirname);

    await app
      .use(express.static(__dirname + '/client'))
      .use(express.json())
      .listen(PORT, () => console.log(`Listening on ${ PORT }`));
};

startApp();