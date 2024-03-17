const mongoose = require("mongoose");

const bikingTrailSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  url: { type: String },
  length: { type: String },
  description: { type: String },
  directions: { type: String },
  city: { type: String },
  region: { type: String },
  country: { type: String },
  lat: { type: String },
  lon: { type: String },
  difficulty: { type: String },
  features: { type: String },
  rating: { type: Number },
  thumbnail: { type: String },
});

const BikingTrail = mongoose.model("BikingTrail", bikingTrailSchema);

module.exports = BikingTrail;
