const MongoClient = require('mongodb').MongoClient;
const {url} = require('./url');

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});