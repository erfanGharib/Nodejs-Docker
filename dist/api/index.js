"use strict";
var MongoClient = require('mongodb').MongoClient;
var _a = require('../index.js'), dbUrl = _a.dbUrl, databaseName = _a.databaseName;
var Joi = require('joi');
var errorMessages = {
    sign_up: [
        { id: 0, err: 'Email must be valid' },
        { id: 1, err: 'Password length must be at least 5 characters long' },
        { id: 2, err: 'Email has already been taken' },
    ],
    log_in: [
        { id: 0, err: 'There is no account with this email' },
        { id: 1, err: 'Wrong password' },
    ],
    noError: { id: 3, err: 'no error' }
};
var validateUser = function (user) {
    var schemaEmail = Joi.string().required().email();
    var schemaPass = Joi.string().required().min(5);
    return [schemaEmail.validate(user.email), schemaPass.validate(user.password)];
};
var createAPI = function (app, directories) {
    app.get('/403', function (req, res) {
        res.status(403)
            .sendFile("".concat(directories, "/client/pages/403-page.html"));
    });
    app.get('/api/users/:id', function (req, res) {
        MongoClient.connect(dbUrl, function (err, db) {
            if (err)
                throw err;
            db.db(databaseName).collection('users')
                .find({}).toArray(function (err, result) {
                if (err)
                    throw err;
                var userExist = false;
                result.forEach(function (value) {
                    userExist = false;
                    if (value._id.toHexString() === req.params.id) {
                        userExist = true;
                        return res.send(value.email);
                    }
                    ;
                });
                if (!userExist)
                    return res.status(404);
            });
        });
    });
    app.post('/api/users/sign-up', function (req, res) {
        var error = validateUser(req.body);
        // send sign in error
        for (var i = 0; i < 2; i++) {
            if (error[i].error !== undefined)
                return res.send(errorMessages.sign_up[i]);
        }
        MongoClient.connect(dbUrl, function (err, db) {
            if (err)
                throw err;
            var userExist = false;
            var dName = db.db(databaseName);
            dName.collection('users').find({}).toArray(function (err, result) {
                if (err)
                    throw err;
                result.forEach(function (user) {
                    if (user.email === req.body.email) {
                        res.send(errorMessages.sign_up[2]);
                        return userExist = true;
                    }
                });
                if (!userExist) {
                    dName.collection('users').insertOne(req.body, function (err, result_) {
                        if (err)
                            throw err;
                        res.cookie('userId', result_.insertedId.toHexString())
                            .send(errorMessages.noError);
                    });
                }
            });
        });
    });
    app.post('/api/users/log-in', function (req, res) {
        console.log(req.body);
        MongoClient.connect(dbUrl, function (err, db) {
            if (err)
                throw err;
            var dName = db.db(databaseName);
            var runOnce = false;
            dName.collection('users').find({}).toArray(function (err, result) {
                if (err)
                    throw err;
                if (result[0] === undefined)
                    return res.send(errorMessages.log_in[0]);
                return result.forEach(function (user) {
                    if (!runOnce && user.email !== req.body.email) {
                        runOnce = true;
                        return res.status(404).send(errorMessages.log_in[0]);
                    }
                    else if (!runOnce && user.password !== req.body.password) {
                        runOnce = true;
                        return res.status(404).send(errorMessages.log_in[1]);
                    }
                    else if (!runOnce) {
                        runOnce = true;
                        return res.cookie('userId', user._id.toString())
                            .send(errorMessages.noError);
                    }
                    ;
                });
            });
        });
    });
    app.delete('/api/users/:id', function (req, res) {
        MongoClient.connect(dbUrl, function (err, db) {
            if (err)
                throw err;
            var dName = db.db(databaseName);
            dName.collection('users').find({}).toArray(function (err, result) {
                result.forEach(function (value) {
                    if (value._id.toString() === req.params.id)
                        dName.collection('users').deleteOne({ email: value.email }, function (err) {
                            if (err)
                                return res.status(404);
                            return res.send('user deleted successfully');
                        });
                });
            });
        });
    });
};
module.exports = { createAPI: createAPI };
//# sourceMappingURL=index.js.map