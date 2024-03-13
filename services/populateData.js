require('dotenv').config();

const mockData = require('../data/hike.json');

const hiking = require('../models/hikes.js');

const connectDB = require('./mongoConnect.js');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/hiking');
        await hiking.create(mockData);
        console.log('Success!');
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }

}
start();