const express = require("express");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");
const morgan = require("morgan");
const ejs = require("ejs");
const json = require("./data/trails.json");
const trails = require("./data/hike.json");
const icons = require("./data/icons.json");
const links = require("./data/links.json");
const names = require("./data/names.json");

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(morgan("combined"));
app.use(flash());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "feedmeseymour",
    resave: true,
    saveUninitialized: true
  })
);
app.set("view engine", "ejs");

// flash validation messages
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

// Logged in user 

app.use((req, res, next) => {
  res.locals.loggedIn = !!req.session.username; 
  res.locals.username = req.session.username || ""; 
  next();
});

// Controllers
const userController = require("./controllers/user.js");
app.use("/", userController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

const hikesController = require("./controllers/hikes.js");
app.use("/hikes", hikesController);

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs", {
    trails: trails.trails,
    icons: icons.icons,
    links: links.links,
    names: names.names,
  });
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs", {});
});

app.get("/login", (req, res) => {
  res.render("login.ejs", {});
});

app.get("/viewhike/:id", (req, res) => {
  const trailId = parseInt(req.params.id);
  const trail = trails.trails.find((trail) => trail.id === trailId);

  if (!trail) {
    res.status(404).send("Trail not found");
  } else {
    res.render("viewhike.ejs", { trail: trail });
  }
});

app.get("/json", (req, res) => {
  res.json(json);
});

app.get("/trails", (req, res) => {
  res.json(trails);
});

app.get("/links", (req, res) => {
  res.json(links);
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = app;
