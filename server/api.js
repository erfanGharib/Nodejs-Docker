const MongoClient = require('mongodb').MongoClient;
const { url, databaseName, directories } = require('../main');
const Joi = require('joi');

const errorMessages = [
    { id: 0, err: 'Email must be valid' },
    { id: 1, err: 'Password length must be at least 5 characters long' },
    { id: 2, err: 'Email has already been taken' },
    { id: 3, err: 'no error' },
];

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
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;

            db.db(databaseName).collection('users')
                .find({}).toArray((err, result) => {
                    if (err) throw err;

                    let userExist=false;

                    result.forEach(value => {
                        userExist=false;
                        if(value._id.toHexString() === req.params.id) {
                            userExist = true;
                            return res.send(value.email)
                        };
                    });
                    if(!userExist) return res.status(404).send('user with requested id, not found!');
                });
        });
    });

    app.post('/api/users', (req, res) => {
        const error = validateUser(req.body);

        for (let i=0; i < 2; i++) {
            if (error[i].error !== undefined)
                return res.send(errorMessages[i]);
        }

        MongoClient.connect(url, (err, db) => {
            if (err) throw err;

            let userExist = false;
            const dName = db.db(databaseName);

            dName.collection('users').find({}).toArray((err, result) => {
                if (err) throw err;

                result.forEach(user => {
                    if (user.email === req.body.email) {
                        res.send(errorMessages[2]);
                        return userExist = true;
                    }
                });

                if (!userExist) {
                    dName.collection('users').insertOne(req.body, (err, result_) => {
                        if (err) throw err;

                        res.cookie(
                            'userId', 
                            result_.insertedId.toHexString(),
                            {expire: new Date() + 9999},
                            {maxAge: 10800}
                        )
                        .send(errorMessages[3]);
                    });
                }
            });
        });
    });

    app.delete('/api/users/:id', (req, res) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;

            const dName = db.db(databaseName);
            dName.collection('users').find({}).toArray((err, result)=> {
                result.forEach(value => {
                    if(value._id.toString() === req.params.id)
                        dName.collection('users').deleteOne({ email: value.email }, (err,result) => {
                            if (err) return res.status(404).send('user with requested id, not found!');
                            return res.send('user deleted successfully');
                        });
                });
            });
        });
    });
};

module.exports = { createAPI };