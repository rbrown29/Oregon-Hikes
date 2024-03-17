require('dotenv').config();

// populate json data to Database the first time, then comment out

//const mockData = require('../data/hike.json');
//const mockData = require('../data/trails.json');
//const mockData = require('../data/biking.json');

//const Hike = require('../models/hikes.js');
//const Trail = require('../models/trails.js');
//const Biking = require('../models/biking.js');


const start = async () => {

    try {
        await Biking.deleteMany();
        await Biking.create(mockData.BikingTrails);
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

    // try {
    //     await Hike.deleteMany();
    //     await Hike.create(mockData.trails);
    //     console.log('Success!');
    //     process.exit(0);
    // }
    // catch (error) {
    //     console.log(error);
    //     process.exit(1);
    // }
}
start();