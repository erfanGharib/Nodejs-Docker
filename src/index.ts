import { Express } from 'express';
import checkUserStatus from './middlewares/checkUserStatus.js';
// import { routesData } from './data/routesData.js.js';
import aboutUsRouter from './routes/aboutUs.js';
import contactUsRouter from './routes/contactUs.js';
import forbiddenRouter from './routes/forbidden.js';
import indexRouter from './routes/index.js';
import notFoundRouter from './routes/notFound.js';
import signinRouter from './routes/signin.js';
import signupRouter from './routes/signup.js';

const express = require('express');
const app: Express = express();
const bodyParser = require('body-parser');
const path = require('path');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// view and components directory
export const __views = path.join(__dirname, 'views')
export const __components = path.join(__dirname, 'public/components')

app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(express.static(path.join(__dirname, 'public')))
    .use(cookieParser())
    .use(checkUserStatus)

    .use('/', indexRouter)
    .use('/aboutUs', aboutUsRouter)
    .use('/contactUs', contactUsRouter)
    .use('/403', forbiddenRouter)
    .use('/signin', signinRouter)
    .use('/signup', signupRouter)
    .use('/', notFoundRouter)

    .engine('handlebars', engine({
        layoutsDir: path.join(__views, "layouts"),
        partialsDir: __components
    }))
    .set('view engine', 'handlebars')
    .set("views", __views)
    .listen(process.env.PORT, () => {
        console.log(`Server Listening on Port ${process.env.PORT}`);
    })