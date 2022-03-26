const databaseName = 'fullstack-practise';
const dbUrl = 'mongodb://127.0.0.1:27017/';
require('mongodb').MongoClient.connect(dbUrl, (err, db) => {
    if (err) throw err;
    console.log(`${databaseName} database created!`);
    const dName = db.db(databaseName);
    dName.createCollection('users', (err, res) => {
        if (err) throw err;
        console.log('collection created!');
    });
});