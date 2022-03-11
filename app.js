const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const path = require("path");
const BlogPost = require("./models/BlogPosts");

const app = express();

//connect DB
mongoose.connect("mongodb://localhost/cleanblog-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATES ENGINE
app.set("view engine", "ejs");

//MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //url'deki datayı okumamızı sağlar
app.use(express.json()); //url'deki datayı json formatına dönüştürmeyi sağlar

//ROUTES
app.get("/", (req, res) => {
  const blogposts = BlogPost.find({});
  res.render("index", {
    blogposts,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add_post", (req, res) => {
  res.render("add_post");
});
app.get("/post", (req, res) => {
  res.render("post");
});

//Form etiketinde action="/blogposts" kısmında yakalıyor. Formdaki verilerden yeni post objesi yaratıyor. Dögü bitimi içinde ana sayfaya yönlendiriliyor.
app.post("/blogposts", async (req, res) => {
  await BlogPost.create(req.body);
  res.redirect("/");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı portta çalışıyor...`);
});
