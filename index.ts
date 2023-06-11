import { Express } from 'express';

const express = require('express');
const app: Express = express();
const bodyParser = require('body-parser');
const path = require('path');
const Handlebars = require("handlebars");
// const template = Handlebars.compile('./src/pages/index.handlebars');
const { engine } = require('express-handlebars');
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
        layoutsDir: path.join(__dirname, "/src/views/layouts")
    }))
    .set('view engine', 'handlebars')
    .set("views", path.join(__dirname, "/src/views"))
    .get('/', (req, res) => {
        res.render('index')
    })
    .listen(process.env.PORT, () => {
        console.log(`Server Listening on Port ${process.env.PORT}`);
    })