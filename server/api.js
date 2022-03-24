const MongoClient = require('mongodb').MongoClient;
const { dbUrl, databaseName, directories } = require('../index.js');
const Joi = require('joi');

const errorMessages = {
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
}

const validateUser = (user) => {
    const schemaEmail = Joi.string().required().email();
    const schemaPass = Joi.string().required().min(5);
    return [schemaEmail.validate(user.email), schemaPass.validate(user.password)];
};

const createAPI = (app) => {
    app.get('/403', (req, res) => {
        res.status(403)
        .sendFile(`${directories}/client/pages/403-page.html`);
    });

    app.get('/api/users/:id', (req, res) => {
        console.log('get 1');
        // MongoClient.connect(dbUrl, (err, db) => {
        //     if (err) throw err;

        //     db.db(databaseName).collection('users')
        //         .find({}).toArray((err, result) => {
        //             if (err) throw err;

        //             let userExist=false;

        //             result.forEach(value => {
        //                 userExist=false;
        //                 if(value._id.toHexString() === req.params.id) {
        //                     userExist = true;
        //                     return res.send(value.email)
        //                 };
        //             });
        //             if(!userExist) return res.status(404);
        //         });
        // });
    });

    app.post('/api/users/sign-up', (req, res) => {
        const error = validateUser(req.body);
        // send sign in error 
        for (let i=0; i < 2; i++) {
            if (error[i].error !== undefined)
                return res.send(errorMessages.up[i]);
        }
        console.log('post 2');

        // MongoClient.connect(dbUrl, (err, db) => {
        //     if (err) throw err;

        //     let userExist = false;
        //     const dName = db.db(databaseName);

        //     dName.collection('users').find({}).toArray((err, result) => {
        //         if (err) throw err;

        //         result.forEach(user => {
        //             if (user.email === req.body.email) {
        //                 res.send(errorMessages.sign_up[2]);
        //                 return userExist = true;
        //             }
        //         });

        //         if (!userExist) {
        //             dName.collection('users').insertOne(req.body, (err, result_) => {
        //                 if (err) throw err;

        //                 res.cookie('userId',result_.insertedId.toHexString())
        //                 .send(errorMessages.noError);
        //             });
        //         }
        //     });
        // });
    });

    app.post('/api/users/log-in', (req, res) => {
        console.log('post 3');

        // MongoClient.connect(dbUrl, (err, db) => {
        //     if (err) throw err;

        //     const dName = db.db(databaseName);
        //     let runOnce = false;

        //     dName.collection('users').find({}).toArray((err, result) => {
        //         if (err) throw err;
                
        //         if(result[0] === undefined) return res.send(errorMessages.log_in[0]);

        //         return result.forEach(user => {
        //             if (!runOnce && user.email !== req.body.email) {
        //                 runOnce = true;
        //                 return res.status(404).send(errorMessages.log_in[0]);
        //             }
                    
        //             else if (!runOnce && user.password !== req.body.password) {
        //                 runOnce = true;
        //                 return res.status(404).send(errorMessages.log_in[1]);
        //             }
                    
        //             else if(!runOnce) {
        //                 runOnce = true;
        //                 return res.cookie('userId', user._id.toString())
        //                 .send(errorMessages.noError);
        //             };
        //         });
        //     });
        // });
    });

    app.delete('/api/users/:id', (req, res) => {
        MongoClient.connect(dbUrl, (err, db) => {
            if (err) throw err;

            const dName = db.db(databaseName);
            dName.collection('users').find({}).toArray((err, result)=> {
                result.forEach(value => {
                    if(value._id.toString() === req.params.id)
                        dName.collection('users').deleteOne({ email: value.email }, err => {
                            if (err) return res.status(404);
                            return res.send('user deleted successfully');
                        });
                });
            });
        });
    });
};

module.exports = { createAPI };