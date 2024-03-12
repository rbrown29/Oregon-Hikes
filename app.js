const express = require('express');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const ejs = require('ejs');
const json = require('./trails.json');
const trails = require('./hike.json');
const icons = require('./icons.json');
const links = require('./links.json');
const names = require('./names.json');

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {origin: 'http://localhost:3001', credentials: true, optionsSuccessStatus: 200}
));
app.use(morgan('combined'));
app.use(methodOverride('_method'));
app.use(session({
    secret: "feedmeseymour",
    resave: true,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');



// Controllers
//app.use('/contact', require('./controllers/contact.js'));

// Routes
app.get('/', (req, res) => {
    res.render('index.ejs', {trails: trails.trails, icons: icons.icons, links: links.links, names: names.names});
});

app.get('/signup', (req, res) => {
    res.render('signup.ejs', {});
});

app.get('/login', (req, res) => {
    res.render('login.ejs', {});
});

app.get('/json', (req, res) => {
    res.json(json);
});

app.get('/trails', (req, res) => {
    res.json(trails);
});

app.get('/links', (req, res) => {
    res.json(links);
});

module.exports = app;