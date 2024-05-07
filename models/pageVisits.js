const mongoose = require("mongoose");

const pageVisitSchema = new mongoose.Schema({
    url: { type: String, required: true},
    count: { type: Number, required: true, default: 0},
    });

const Visit = mongoose.model("Visit", pageVisitSchema);

module.exports = Visit;