const MongoClient = require('mongodb').MongoClient;
const {url} = require('./url');

MongoClient.connect(url, (err, db) => {
    if(err) throw err;
    const databaseName = db.db('testdb'); // select database
    const newUser = { email:'userEmail1', password:'userPassword1' };
    
    databaseName.collection('users').insertOne(newUser, (err, res) => {
        if(err) throw err;
        console.log('new user inserted!');
        console.log(res);
        db.close();
    });
});