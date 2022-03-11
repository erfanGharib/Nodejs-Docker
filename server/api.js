const Joi = require('joi');
const users = [
    { id:1, email:'erfan@gamil.com', password:'erfan' },
    { id:2, email:'navid@gamil.com', password:'navid' },
];

const validateUser =(user)=> {
    const schemaEmail = Joi.string().required().email();
    const schemaPass = Joi.string().required().min(5);
    return [schemaEmail.validate(user.email), schemaPass.validate(user.password)];
};
const createAPI =(app)=> {
    app.get('/api/users/:id', (req, res) => {
        const user = users.find(u => u.id === parseInt(req.params.id));
        if(!user)
            return res.status(404).send('user with requested id, not found!');

        res.send({
            email:user.email
        });
    });

    app.post('/api/users', (req, res) => {
        const error = validateUser(req.body);
        const { email, password } = req.body;

        if(error) return res.send(error);

        const user = {
            id:users.length + 1,
            email:email,
            password:password
        };
        users.push(user);
    });

    app.delete('/api/users/:id', (req, res) => {
        const user = users.find(u => u.id === parseInt(req.params.id));
        if(!user) return res.status(404).send('user with requested id, not found!');
        
        users.shift(user);
        res.send(user);
    });
};

module.exports = { createAPI };