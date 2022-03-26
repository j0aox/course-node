const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

// configurando o partials
const hbs = exphbs.create({
  partialsDir: ['views/partials']
});

// configurando o partials
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  const items = ["Item A", "Item B", "Item C"];

  res.render("dashboard", { items: items });
});

app.get("/post", (req, res) => {
  const post = {
    title: "Aprender Node.js",
    category: "JavaScript",
    body: "Este artigo vai ajudar aprender Node.js",
    comments: 4,
  };

  res.render("blogpost", { post: post });
});

app.get("/blog", (req, res) => {
  const posts = [
    {
      title: "Aprender Node.js",
      category: "JavaScript",
      body: "Este artigo vai ajudar aprender Node.js",
      comments: 4,
    },
    {
      title: "Aprender PHP",
      category: "PHP",
      body: "Este artigo vai ajudar aprender PHP",
      comments: 4,
    }
  ]

  res.render("blog", { posts: posts });
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
