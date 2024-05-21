const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "Please provide your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: true,
  },
  bio: {
    type: String,
  }
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;