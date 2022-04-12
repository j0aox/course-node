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
});

app.get("/users/:id", async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({ raw: true, where: { id: id } });

    res.render("userview", { user });
});

app.post("/users/delete/:id", async (req, res) => {
    const id = req.params.id;

    await User.destroy({ where: { id: id } });

    res.redirect("/");
});

app.get("/users/edit/:id", async (req, res) => {
    const id = req.params.id;

    const user = await User.findOne({ raw: true, where: { id: id } });

    res.render("useredit", { user });
});

app.post("/users/update", async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, { where: {id: id} });

    res.redirect("/");
});

app.get("/", async (req, res) => {
    const users = await User.findAll({raw: true});

    console.log(users);

    res.render("home", { users: users });
});

con
    .sync()
    //.sync({ force: true }) // forçar a recriação das tabelas, perde todos os dados
    .then(() => {
        app.listen(3000, () => {
            console.log("Servidor rodando na porta http://localhost:3000");
        });
    })
    .catch((err) => console.log(err));
