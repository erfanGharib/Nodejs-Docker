import { Express } from 'express';
import { routesData } from './server/data/routesData.js';
import router from './server/router/index.js';

const express = require('express');
const app: Express = express();
const bodyParser = require('body-parser');
const path = require('path');
const Handlebars = require("handlebars");
const { engine } = require('express-handlebars');
require('dotenv').config();

// view and components directory
export const __views = path.join(__dirname, 'client/views')
export const __components = path.join(__dirname, 'client/components')

/** pass all navbar links to handlebars layout based on @routesData */
Handlebars.registerHelper('navbarLinks', ({ data }: { data: any }) => {
    let result = '';
    routesData.forEach(({ route }) => {
        const unexpectedRoutes = [
            '/403', '/*', '/'
        ]
        if(unexpectedRoutes.some(route_ => route === route_)) return;
     
        result += `
            <a 
                href='${route}' 
                class="${data?.root?.title?.toLowerCase().includes(route.replace('/', '')?.toLowerCase()) && 'bg-blue-700'} capitalize md:ml-3 mb-3 md:mb-0 !bg-opacity-40 !border-opacity-60 border border-blue-600 hover:bg-blue-700 text-blue-100 py-2 px-3 text-sm transition-all"
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
    .use(express.static(__dirname))
    .use('/', router)
    .engine('handlebars', engine({
        layoutsDir: path.join(__dirname, "client/views/layouts")
    }))
    .set('view engine', 'handlebars')
    .set("views", path.join(__dirname, "client/views"))
    .listen(process.env.PORT, () => {
        console.log(`Server Listening on Port ${process.env.PORT}`);
    })