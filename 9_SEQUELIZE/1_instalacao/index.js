const express = require("express");
const exphbs = require("express-handlebars");
const con = require("./db/conn");

const app = express();

// configurando para pegar os dados do body como json
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// configurando para pegar os dados do body como json
app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(3000);