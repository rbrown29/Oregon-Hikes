const mongoose = require('mongoose');

const ipSchema = new mongoose.Schema({
    ipAddress: {
        type: String,
        required: true,
    },
    country: {
        type: String,
    },
    region: {
        type: String,
    },
    city: {
        type: String,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const IPLog = mongoose.model('IPLog', ipSchema);

module.exports = IPLog;
