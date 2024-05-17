const mongoose = require('mongoose');

const ipSchema = new mongoose.Schema({
    ipAddress: {
        type: String
    },
    country : {
        type: String
    },
    region : {
        type: String
    },
    city : {
        type: String
    },
    latitude : {
        type: Number
    },
    longitude : {
        type: Number
    },
    timestamp : {
        type: Date,
        default: Date.now
    }
});

const IpLog = mongoose.model('Ip', ipSchema);

module.exports = IpLog;