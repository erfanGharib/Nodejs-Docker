"use strict";
// const { MongoClient } = require('mongodb');
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
mongodb_1.MongoClient.connect(process.env.DB_URL, function (err, db) {
    var dName = db.db(process.env.DB_NAME);
    dName.createCollection('users', function (err, result) {
        if (err)
            throw err;
        console.log('collection created!');
    });
});
//# sourceMappingURL=createDatabase.js.map