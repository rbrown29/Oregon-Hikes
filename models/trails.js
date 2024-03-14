const mongoose = require("mongoose");

const trailSchema = new mongoose.Schema({
  id: {
    type: String, 
  },
  name: {
    type: String,
  },
  urls: {
    absoluteSource: {
      type: String,
    },
    trailStart: {
      type: String,
    },
    trailEnd: {
      type: String,
    },
  },
  measures: {
    difficulty: {
      type: String,
    },
    distance: {
      value: {
        type: Number,
      },
      measure: {
        type: String,
      },
    },
    elevationGain: {
      value: {
        type: Number,
      },
      measure: {
        type: String,
      },
    },
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  locations: {
    trailStart: { 
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
  },
});

const Trail = mongoose.model("Trail", trailSchema);

module.exports = Trail;
