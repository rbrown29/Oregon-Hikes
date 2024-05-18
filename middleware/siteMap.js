const path = require('path');

function siteMap(req, res) {
    res.sendFile(path.join(__dirname, '..', 'sitemap.xml')); 
}

module.exports = {
    siteMap
};