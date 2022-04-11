const express = require("express");
const exphbs = require("express-handlebars");
const con = require("./db/conn");

const User = require("./models/User");

const app = express();

// configurando para pegar os dados do body como json
app.use(
    express.urlencoded({
        extended: true,
    })
);

// configurando para pegar os dados do body como json
app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/users/create", (req, res) => {
    res.render("adduser");
});

app.post("/users/create", async (req, res) => {
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    console.log(req.body);

    await User.create({
        name,
        occupation,
        newsletter,
    });

    res.redirect("/");
})

app.get("/", async (req, res) => {
    const users = await User.findAll({raw: true});

    console.log(users);

    res.render("home", { users: users });
});

con
    .sync()
    .then(() => {
        app.listen(3000, () => {
            console.log("Servidor rodando na porta http://localhost:3000");
        });
    })
    .catch((err) => console.log(err));
