const mongoose = require('mongoose');
const db = mongoose.connection;
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Hiking';

// Connect to Mongo
mongoose.connect(MONGODB_URI, {
     useNewUrlParser: true, 
     useUnifiedTopology: true
});
db.on('open', () => {
    console.log('Connected to MongoDB' + MONGODB_URI);
});
db.on('error', (err) => {
    console.log(err.message + ' is MongoDB not running?');
});
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = mongoose;