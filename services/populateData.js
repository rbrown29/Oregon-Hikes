require('dotenv').config();

// populate json data on server start the first time, then comment out

const mockData = require('../data/hike.json');
//const mockData = require('../data/trails.json');

const Hike = require('../models/hikes.js');
//const Trail = require('../models/trails.js');


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

    // try {
    //     await Trail.deleteMany();
    //     await Trail.create(mockData.items);
    //     console.log('Success!');
    //     process.exit(0);
    // }
    // catch (error) {
    //     console.log(error);
    //     process.exit(1);
    // }
}
start();