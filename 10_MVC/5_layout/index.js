const express = require('express');
const { engine } = require('express-handlebars');

const app = express();

const conn = require('./db/conn.js');

// Models
const Task = require('./models/Task');

// routes
const taskRoutes = require('./routes/taskRoutes');

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

app.use('/tasks', taskRoutes);

(async () => {
    await conn.sync();

    try {
        app.listen(3000);
    } catch (error) {
        console.log(error);
    }
})();