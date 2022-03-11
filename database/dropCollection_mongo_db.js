const MongoClient = require('mongodb').MongoClient;
const {url} = require('./url');

MongoClient.connect(url, (err, db) => {
    if(err) throw err;
    const databaseName = db.db('testdb'); // select database
    
    databaseName.collection('testdb').drop((err, delOK) => {
        if(err) throw err;
        if(delOK) console.log('database deleted!');
        db.close();
    });
});