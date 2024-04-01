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
  },
  jwt: {
    type: String,
  },
  loginCount: {
    type: Number,
    default: 0,
  },
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString(), username: user.username }, process.env.JWT_SECRET);
  user.jwt = token; 
  await user.save();
  return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
