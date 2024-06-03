const mongoose = require('mongoose');
const IPLog = require('../models/Ip');

async function removeDuplicates() {
    try {
        const logs = await IPLog.find({}).sort({ _id: 1 });
        const uniqueIps = new Set();
        const duplicates = [];

        logs.forEach(log => {
            if (uniqueIps.has(log.ipAddress)) {
                duplicates.push(log._id);
            } else {
                uniqueIps.add(log.ipAddress);
            }
        });

        if (duplicates.length > 0) {
            await IPLog.deleteMany({ _id: { $in: duplicates } });
            console.log(`Deleted ${duplicates.length} duplicate entries.`);
        } else {
            console.log('No duplicates found.');
        }
    } catch (error) {
        console.error('Error removing duplicates:', error);
    } finally {
        mongoose.connection.close();
    }
}

removeDuplicates();

module.exports = removeDuplicates;