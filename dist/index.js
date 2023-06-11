"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var Handlebars = require("handlebars");
// const template = Handlebars.compile('./src/pages/index.handlebars');
var engine = require('express-handlebars').engine;
require('dotenv').config();
// Handlebars.registerPartial('layout', '{{prefix}}');
// Handlebars.registerHelper('layout', (name: any, options: any) => {
//     let radioList = options.fn()
//     console.log(radioList);
// })
app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(express.static(path.join(__dirname, 'src')))
    .engine('handlebars', engine({
    layoutDir: path.join(__dirname, "/src/views/layouts")
}))
    .set('view engine', 'handlebars')
    .set("views", path.join(__dirname, "/src/views"))
    .get('/', function (req, res) {
    res.render('index');
})
    .listen(process.env.PORT, function () {
    console.log("Server Listening on Port ".concat(process.env.PORT));
});
//# sourceMappingURL=index.js.map