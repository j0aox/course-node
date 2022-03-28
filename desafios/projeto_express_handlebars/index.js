const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const hbs = exphbs.create({
    partialsDir: ['views/partials']
});

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

const products = [
    {
        id: 1,
        title: "Maçã"
    },
    {
        id: 2,
        title: "Uva"
    },
    {
        id: 3,
        title: "Banana"
    }
];

app.get("/", (req, res) => {
    res.render("home", { products });
});

app.get("/product/:id", (req, res) => {
    const product = products[parseInt(req.params.id) - 1];

    res.render("product", { product });
});

app.listen(3000, () => {
    console.log("App funcionando!");
});
