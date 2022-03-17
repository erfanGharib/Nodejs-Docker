const { directories } = require('../main.js');
const files = [
    {file: 'components/dropdownMenu.js', url: 'dropdown-menu'},
    {file: 'components/navbar.js', url: 'navbar'},
    {file: 'components/submit-btn.js', url: 'submit-btn'},
    {file: 'components/show-pass.js', url: 'show-pass'},

    {file: 'scripts/createElement.js', url: 'create-element'},
    {file: 'scripts/index.js', url: 'indexjs'},
    
    {file: 'style.css', url: 'style'},
    {file: 'favicon.png', url: 'favicon'},
    
    {file: 'pages/log-in.js', url: 'login'},
    {file: 'pages/sign-up.js', url: 'signup'},
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