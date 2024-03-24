const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  }
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, username: this.username }, process.env.JWT_SECRET, {
    expiresIn: "process.env.JWT_EXPIRES_IN",
  }, { algorithm: "HS256" });
}

const User = mongoose.model("User", userSchema);

module.exports = User;
