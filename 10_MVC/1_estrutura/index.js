const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

const conn = require('./db/conn.js');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.use(express.static('public'));

app.listen(3000);