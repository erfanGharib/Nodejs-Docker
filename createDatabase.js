const MongoClient = require('mongodb').MongoClient;
const { dbUrl, databaseName } = require('./index.js');

MongoClient.connect(dbUrl, (err, db) => {
    if (err) throw err;
    console.log(`${databaseName} database created!`);
    const dName = db.db(databaseName);
    dName.createCollection('users', (err, res) => {
        if (err) throw err;
        console.log('collection created!');
    });
});