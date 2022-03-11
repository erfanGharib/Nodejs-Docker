const MongoClient = require('mongodb').MongoClient;
const {url} = require('./url');

MongoClient.connect(url, (err, db) => {
    if(err) throw err;
    const databaseName = db.db('testdb'); // select database
    databaseName.createCollection('users'/* collection name */, (err, res) => {
        if(err) throw err;
        console.log('collection created!');
        db.close();
    });
});