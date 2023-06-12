import { Express } from 'express';
import { routesData } from './src/data/routesData';
import router from './src/router';
import handler_notFound from './src/router/handlers/404';

const express = require('express');
const app: Express = express();
const bodyParser = require('body-parser');
const path = require('path');
const Handlebars = require("handlebars");
const { engine } = require('express-handlebars');
require('dotenv').config();

export const __views = path.join(__dirname, '/src/views')
export const __components = path.join(__dirname, '/src/components')

Handlebars.registerHelper('navbarLinks', ({ data }: { data: any }) => {
    let result = '';

    routesData.forEach(({ route }) => {
        if(route.includes('403')) return;
        
        result += `
            <a 
                href='${route}' 
                class="${data?.root?.title?.toLowerCase().includes(route.replace('/', '')?.toLowerCase()) && 'bg-blue-700'} capitalize ml-3 !bg-opacity-40 !border-opacity-60 border border-blue-600 hover:bg-blue-700 text-blue-100 py-2 px-3 text-sm transition-all"
            >
                ${route.replace('/', '')}
            </a>
        `
    })

    return result;
})

app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(express.static(path.join(__dirname, 'src')))
    .use('/', router)
    .engine('handlebars', engine({
        layoutsDir: path.join(__dirname, "/src/views/layouts")
    }))
    .set('view engine', 'handlebars')
    .set("views", path.join(__dirname, "/src/views"))
    .get('/', (_, res) => res.render('home'))
    .get('*', (req, res) => handler_notFound(req, res))
    .listen(process.env.PORT, () => {
        console.log(`Server Listening on Port ${process.env.PORT}`);
    })