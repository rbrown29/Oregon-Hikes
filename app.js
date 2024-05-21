const express = require("express");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");
const morgan = require("morgan");
const ejs = require("ejs");
const { ensureAuthenticated } = require("./middleware/auth.js");
const rateLimiter = require("express-rate-limit");
const bodyParser = require("body-parser");
const { pageVisits } = require("./middleware/pageVisits");
const { IPlog } = require("./middleware/Iplog.js");
const { search } = require("./middleware/search.js");
const { camp } = require("./middleware/camping.js");
const { bike } = require("./middleware/biking.js");
const { hike } = require("./middleware/hiking.js");
const { logout } = require("./middleware/logout.js");
const { main } = require("./middleware/main.js");
const { viewHike } = require("./middleware/viewHike.js");
const { flashErrors } = require("./middleware/flashErrors.js");
const { loggedUser } = require("./middleware/loggedUser.js");
const { siteMap } = require("./middleware/siteMap.js");
const { disclaimer } = require("./middleware/disclaimer.js");
const { signUp } = require("./middleware/signUp.js");
const { login } = require("./middleware/login.js");

// Middleware
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(morgan("dev"));
app.use(flash());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "feedmeseymour",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.set("view engine", "ejs");

// flash validation messages
app.use(flashErrors);

// Logged in user
app.use(loggedUser);

// Controllers
const userController = require("./controllers/user.js");
app.use("/", userController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

const hikesController = require("./controllers/hikes.js");
app.use("/hikesData", ensureAuthenticated, hikesController);

const trailsController = require("./controllers/trails.js");
app.use("/trailsData", ensureAuthenticated, trailsController);

const bikingController = require("./controllers/biking.js");
app.use("/bikingData", ensureAuthenticated, bikingController);

const userProfilesController = require("./controllers/userProfile.js");
app.use("/profile", ensureAuthenticated, userProfilesController);


app.use("/reset-password", (req, res) => {
  res.render("reset-password.ejs");
});

app.use("/reset", (req, res) => {
  res.render("reset.ejs");
});

app.use("/sitemap", siteMap);
app.use(pageVisits);
app.use(IPlog);
app.get("/", main);
app.get("/disclaimer", disclaimer);
app.get("/signup", signUp);
app.get("/login", login);
app.get("/viewhike/:id", viewHike);
app.get("/show", ensureAuthenticated, hike );
app.get("/biking", ensureAuthenticated, bike);
app.get("/camping", ensureAuthenticated, camp);
app.get("/search", ensureAuthenticated, search);
app.get("/logout", logout);

module.exports = app;
