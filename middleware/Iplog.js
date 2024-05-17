const axios = require('axios');
const IPLog = require('../models/Ip');

async function IPlog(req, res, next) {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log('User IP: ', userIp);

    if (userIp === '::1' || userIp === '127.0.0.1') {
        console.log('Localhost access detected. Location data will not be fetched.');
        return next();
    }

    try {
        const response = await axios.get(`http://ip-api.com/json/${userIp}`);
        const { country, regionName, city, lat, lon } = response.data;
        console.log(`Location Data: ${country}, ${regionName}, ${city}, ${lat}, ${lon}`);

        const newLog = new IPLog({
            ipAddress: userIp,
            country,
            region: regionName,
            city,
            latitude: lat,
            longitude: lon,
        });

        await newLog.save();
    } catch (error) {
        console.error('Error fetching location or saving to MongoDB:', error);
    }

    next();
}

module.exports = {
    IPlog
};