// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://erfan:NWMXzLJvB_8gHh9@cluster0.gx14m.mongodb.net/fullstack-practise?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("fullstack-practise").collection("users");
//     const obj = {email:'erfaldf@gamildl', password: 'adlhfklauyer'}
//     collection.insertOne(obj, (err, result_) => {
//         if (err) throw err;
//         console.log('user inserted');
// res.cookie('userId',result_.insertedId.toHexString())
// .send(errorMessages.noError);
// });
// client.close();
// });

// require('mongodb').MongoClient.connect(dbUrl, (err, db) => {
//     const dName = db.db(databaseName);
//     dName.createCollection('users', (err, res) => {
//         if (err) throw err;
//         console.log('collection created!');
//     });
// });

const mysql = require('mysql');
const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'test_db',
    port: 8080
});
con.connect();

con.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

con.end();