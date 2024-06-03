const axios = require('axios');
const IPLog = require('../models/Ip');

async function IPlog(req, res, next) {
    let userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log('Raw User IP: ', userIp);

    // Handle multiple IP addresses in 'x-forwarded-for'
    if (userIp.includes(',')) {
        userIp = userIp.split(',')[0].trim();
    }
    console.log('Processed User IP: ', userIp);

    if (userIp === '::1' || userIp === '127.0.0.1') {
        console.log('Localhost access detected. Location data will not be fetched.');
        return next();
    }

    try {
        // Check if the IP address already exists in the database
        const existingLog = await IPLog.findOne({ ipAddress: userIp });
        if (existingLog) {
            console.log('IP address already logged. Skipping save to MongoDB.');
        } else {
            // Fetch location data
            const response = await axios.get(`http://ip-api.com/json/${userIp}`);
            const { country, regionName, city, lat, lon } = response.data;
            console.log(`Location Data: ${country}, ${regionName}, ${city}, ${lat}, ${lon}`);

            // Save new log if IP address is not already logged
            const newLog = new IPLog({
                ipAddress: userIp,
                country,
                region: regionName,
                city,
                latitude: lat,
                longitude: lon,
            });

            await newLog.save();
            console.log('IP address and location saved to MongoDB');
        }
    } catch (error) {
        console.error('Error fetching location or saving to MongoDB:', error);
    }

    next();
}

module.exports = {
    IPlog
};
