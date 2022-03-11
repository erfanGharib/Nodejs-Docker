const port = process.env.port || 8080;
const directories = __dirname;

const routes_$arr = [
    '/',
    '/about-us',
    '/contact-us',
    '/sign-up',
    '/log-in',
];

module.exports = {
    directories, routes_$arr, port,
}