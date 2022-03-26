const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  const items = ["Item A", "Item B", "Item C"]; 

  res.render("dashboard", { items: items });
});

app.get('/post', (req, res) => {
  const post = {
    title: 'Aprender Node.js',
    category: 'JavaScript',
    body: 'Este artigo vai ajudar aprender Node.js',
    comments: 4,
  }

  res.render('blogpost', { post: post });
});

app.get("/", (req, res) => {
  const user = {
    name: "João",
    surname: "Amador",
    age: 24,
  };

  const palavra = "Teste";

  const auth = true;

  const approved = false;

  res.render("home", { user: user, palavra, auth, approved });
});

app.listen(3000, () => {
  console.log("App funcionando!");
});
