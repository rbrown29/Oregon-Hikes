const Visit = require('../models/pageVisits.js'); 

async function pageVisits(req, res, next) {
    const url = `https://oregon-hikes.onrender.com${req.originalUrl}`;
    try {
        const visit = await Visit.findOne({ url: url });
        if (visit) {
            visit.count++;
            await visit.save();
        } else {
            const newVisit = new Visit({ url: url, count: 1 });
            await newVisit.save();
        }
        console.log(`Visits to ${url}: ${visit ? visit.count : 1}`);
        res.locals.visitCount = visit.count; 
    } catch (error) {
        console.error('Database operation failed', error);
    }
    next();
}

module.exports = {
    pageVisits
}
