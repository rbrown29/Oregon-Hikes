const mongoose = require('mongoose');

const hikeSchema = new mongoose.Schema({
    id : {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type : String,
        required: true,
        unique: true,
    },
    length: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    src : {
        type: String,
        required: true,
    },
    video : {
        type: String,
        required: true,
    }

});

const Hike = mongoose.model('Hike', hikeSchema);

module.exports = Hike;