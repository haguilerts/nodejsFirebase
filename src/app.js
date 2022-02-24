const express = require('express')
const morgan = require('morgan')
const exphbs = require("express-handlebars");
const path = require('path')
const app = express();

//rutas
const rutaIndex = require('./routes/indexRouter')


//setting
app.set('port', process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
/* __dirname:url =  haguilerts/Documentos/nodejs_curso_0/node-firebase$  */
app.engine(".hbs", exphbs.create({
    defaultLayout: "main",
    extname: ".hbs",
}).engine);
app.set('view engine', '.hbs');


// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));


//routers
app.use(rutaIndex)


// static files
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app;