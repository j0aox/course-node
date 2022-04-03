const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

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

app.post("/books/insertbooks", (req, res) => {
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;

    con.query(sql, function (err) {
        if (err) {
            console.log(err);
        }

        res.redirect("/");
    });
});

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodemysql"
});

con.connect(function (err) {
    if (err) {
        console.log(err);
    }

    console.log("Conectou ao MySQL!");

    app.listen(3000, () => {
        console.log('O servidor está rodando na porta http://localhost:3000');
    });
});