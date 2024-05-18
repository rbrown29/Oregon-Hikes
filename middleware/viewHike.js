const trails = require("../data/hike.json");

function viewHike (req, res)  {
    const trailId = parseInt(req.params.id);
    const trail = trails.trails.find((trail) => trail.id === trailId);
  
    if (!trail) {
      res.status(404).send("Trail not found");
    } else {
      res.render("viewhike.ejs", { trail: trail });
    }
};

module.exports = {
    viewHike
}