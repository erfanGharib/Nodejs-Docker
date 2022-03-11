const { directories } = require('../main.js');
const files = [
    {file: 'scripts/createElement.js', url: 'create-element'},
    {file: 'scripts/index.js', url: 'indexjs'},
    {file: 'pages/log-in.js', url: 'login'},
    {file: 'pages/sign-up.js', url: 'signup'},
    {file: 'components/navbar.js', url: 'navbar'},
    {file: 'style.css', url: 'style'},
    {file: 'pages/home.js', url: 'home'},
    {file: 'pages/contact-us.js', url: 'contact-us'},
    {file: 'pages/about-us.js', url: 'about-us'},
];
const filePath_$func =(app)=> {
    files.forEach(value => {
        app.get(`/source/${value.url}`, (req, res) => {
            res.sendFile(`${directories}/client/${value.file}`);
        });
    });
}
module.exports = {filePath_$func}