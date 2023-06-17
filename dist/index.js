"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__components = exports.__views = void 0;
var checkUserStatus_js_1 = require("./middlewares/checkUserStatus.js");
// import { routesData } from './data/routesData.js.js';
var aboutUs_js_1 = require("./routes/aboutUs.js");
var contactUs_js_1 = require("./routes/contactUs.js");
var forbidden_js_1 = require("./routes/forbidden.js");
var index_js_1 = require("./routes/index.js");
var notFound_js_1 = require("./routes/notFound.js");
var signin_js_1 = require("./routes/signin.js");
var signup_js_1 = require("./routes/signup.js");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var engine = require('express-handlebars').engine;
var cookieParser = require('cookie-parser');
require('dotenv').config();
// view and components directory
exports.__views = path.join(__dirname, 'views');
exports.__components = path.join(__dirname, 'public/components');
app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(express.static(path.join(__dirname, 'public')))
    .use(cookieParser())
    .use(checkUserStatus_js_1.default)
    .use('/', index_js_1.default)
    .use('/aboutUs', aboutUs_js_1.default)
    .use('/contactUs', contactUs_js_1.default)
    .use('/403', forbidden_js_1.default)
    .use('/signin', signin_js_1.default)
    .use('/signup', signup_js_1.default)
    .use('/', notFound_js_1.default)
    .engine('handlebars', engine({
    layoutsDir: path.join(exports.__views, "layouts"),
    partialsDir: exports.__components
}))
    .set('view engine', 'handlebars')
    .set("views", exports.__views)
    .listen(process.env.PORT, function () {
    console.log("Server Listening on Port ".concat(process.env.PORT));
});
//# sourceMappingURL=index.js.map