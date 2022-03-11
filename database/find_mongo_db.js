const MongoClient = require('mongodb').MongoClient;
const {url} = require('./url');

MongoClient.connect(url, (err, db) => {
    if(err) throw err;
    const databaseName = db.db('testdb'); // select database

    // get one document
    // databaseName.collection('users').findOne({} /* target document */, (err, result) => {
    //     if(err) throw err;
    //     console.log(result);
    //     db.close();
    // });

    // get all documents
    databaseName.collection('users').find({}, { projection: {_id:0, email:1, password:1} })
    .toArray((err, result) => {
        // * projection object that describes which fields to include 
        // * actualy it does filter result
        if(err) throw err;
        console.log(result);
        db.close();
    });
});