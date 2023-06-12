"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("./src/router");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var Handlebars = require("handlebars");
// const template = Handlebars.compile('./src/pages/index.handlebars');
var engine = require('express-handlebars').engine;
require('dotenv').config();
// Handlebars.registerPartial('layout', '{{prefix}}');
Handlebars.registerHelper('navbarLinks', function () {
    return [
        {
            link: '/aboutUs',
            text: 'AboutUs'
        },
        {
            link: '/aboutUs',
            text: 'AboutUs'
        },
        {
            link: '/contactUs',
            text: 'ContactUs'
        },
        {
            link: '/signin',
            text: 'SignIn'
        },
        {
            link: '/signup',
            text: 'SignUp'
        },
    ];
});
app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(express.static(path.join(__dirname, 'src')))
    .use('/', router_1.default)
    .engine('handlebars', engine({
    layoutsDir: path.join(__dirname, "/src/views/layouts")
}))
    .set('view engine', 'handlebars')
    .set("views", path.join(__dirname, "/src/views"))
    .get('/', function (req, res) {
    res.render('home');
})
    .listen(process.env.PORT, function () {
    console.log("Server Listening on Port ".concat(process.env.PORT));
});
//# sourceMappingURL=index.js.map