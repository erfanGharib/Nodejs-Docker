const databaseName = 'fullstack-practise';
const dbUrl = 'mongodb://localhost:27017/';
require('mongodb').MongoClient.connect(dbUrl, (err, db) => {
    if (err) throw err;
    console.log(`${databaseName} database created!`);
    const dName = db.db(databaseName);
    dName.createCollection('users', (err, res) => {
        if (err) throw err;
        console.log('collection created!');
    });
});