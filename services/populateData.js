require('dotenv').config();

const mockData = require('../data/hike.json');

const Hike = require('../models/hikes.js');


const start = async () => {
    try {
        await Hike.deleteMany();
        await Hike.create(mockData.trails);
        console.log('Success!');
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }

}
start();