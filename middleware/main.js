const icons = require("../data/icons.json");
const links = require("../data/links.json");
const names = require("../data/names.json");
const trails = require("../data/hike.json");

function main(req, res)  {
    res.render("index.ejs", {
      trails: trails.trails,
      icons: icons.icons,
      links: links.links,
      names: names.names,
      visitCount: res.locals.visitCount,
    });
  };

module.exports = {
    main
}