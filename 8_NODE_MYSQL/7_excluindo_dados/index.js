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
            return;
        }

        res.redirect("/books");
    });
});

app.get("/books", (req, res) => {
    const sql = "SELECT * FROM books"

    con.query(sql, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        const books = data;

        console.log(books);

        res.render("books", { books });
    });
});

app.get("/books/:id", (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM books WHERE id = ${id}`;

    con.query(sql, function (err, data) {
        if (err) {
            console.log(err);
            return
        }

        const book = data[0];

        res.render("book", { book });
    });
});

app.get("/books/edit/:id", (req, res) => {
    const id = req.params.id;

    const sql = `SELECT * FROM books WHERE id = ${id}`;

    con.query(sql, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }

        const book = data[0];

        res.render('editbook', { book });
    });
});

app.post("/books/updatebook", (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const pageqty = req.body.pageqty;

    const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' WHERE id = ${id}`;

    con.query(sql, function (err) {
        if (err) {
            console.log(err);
            return;
        }

        res.redirect("/books");
    });
});

app.post("/books/remove/:id", (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM books WHERE id = ${id}`;

    con.query(sql, function (err) {
        if (err) {
            console.log(err);
            return
        }

        res.redirect("/books");
    });
});

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodemysql",
    debug: false
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