const express = require("express");
const app = express();
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");
const morgan = require("morgan");
const ejs = require("ejs");
const axios = require("axios");
const json = require("./data/trails.json");
const trails = require("./data/hike.json");
const icons = require("./data/icons.json");
const links = require("./data/links.json");
const names = require("./data/names.json");
const bikeTrails = require("./data/biking.json");
const camping = require("./data/OregonSTCamping&biking.json");
const { ensureAuthenticated } = require("./middleware/auth.js");
const rateLimiter = require("express-rate-limit");
const bodyParser = require("body-parser");
const { pageVisits } = require("./middleware/pageVisits");

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
app.use("/hikesData", ensureAuthenticated, hikesController);

const trailsController = require("./controllers/trails.js");
app.use("/trailsData", ensureAuthenticated, trailsController);

const bikingController = require("./controllers/biking.js");

app.use("/bikingData", ensureAuthenticated, bikingController);

app.use("/sitemap", (req, res) => {
  res.sendFile(__dirname + "/sitemap.xml");
});
app.use(pageVisits);


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

app.get("/show", ensureAuthenticated, async (req, res) => {
  let trailsWithWeather = await Promise.all(
    json.items.map(async (trail) => {
      if (trail.locations && trail.locations.trailStart) {
        const { latitude, longitude } = trail.locations.trailStart;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}`;

        try {
          const weatherResponse = await axios.get(url);
          trail.weather = weatherResponse.data;
          trail.weather.temperatureF =
            ((trail.weather.main.temp - 273.15) * 9) / 5 + 32;
        } catch (error) {
          console.error("Failed to fetch weather data", error);
          trail.weather = null;
        }
      }
      return trail;
    })
  );

  res.render("show.ejs", { trails: trailsWithWeather, json: json.items }); // Render with enhanced data
});

app.get("/biking", ensureAuthenticated, async (req, res) => {
  let trailsWithWeather = await Promise.all(
    bikeTrails.BikingTrails.map(async (BikingTrail) => {
      if (BikingTrail.lat && BikingTrail.lon) {
        const latitude = BikingTrail.lat;
        const longitude = BikingTrail.lon;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        try {
          const weatherResponse = await axios.get(url);
          const tempKelvin = weatherResponse.data.main.temp;
          BikingTrail.weather = weatherResponse.data;
          BikingTrail.weather.temperatureF =
            ((tempKelvin - 273.15) * 9) / 5 + 32;
        } catch (error) {
          console.error("Failed to fetch weather data", error);
          BikingTrail.weather = null;
        }
      }
      return BikingTrail;
    })
  );
  res.render("bikeShow.ejs", {
    BikeTrails: trailsWithWeather,
    bikeTrails: bikeTrails.BikingTrails,
  });
});

app.get("/camping", ensureAuthenticated, async (req, res) => {
  let trailsWithWeather = await Promise.all(
    camping.camp.map(async (camp) => {
      if (camp.location) {
        const { latitude, longitude } = camp.location;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}`;

        try {
          const weatherResponse = await axios.get(url);
          camp.weather = weatherResponse.data;
          camp.weather.temperatureF =
            ((camp.weather.main.temp - 273.15) * 9) / 5 + 32;
        } catch (error) {
          console.error("Failed to fetch weather data", error);
          camp.weather = null;
        }
      }
      return camp;
    })
  );
  res.render("camp.ejs", { camping: trailsWithWeather, camping: camping.camp });
});

app.get("/search", ensureAuthenticated, async (req, res) => {
  const query = req.query.query; // Get query from URL parameter

  // Check if 'query' is not provided or empty
  if (!query) {
    return res.render("search", { results: null, message: "" });
  }

  const options = {
    method: "GET",
    url: "https://google-web-search1.p.rapidapi.com/",
    params: { query: query, limit: "20", related_keywords: "true" },
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "google-web-search1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    res.render("search", { results: response.data.results, message: null });
  } catch (error) {
    console.error(error);
    res.render("search", {
      results: null,
      message: "Failed to fetch results. Please try again.",
    });
  }
});

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = app;
