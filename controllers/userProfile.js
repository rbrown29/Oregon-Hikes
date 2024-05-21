const express = require("express");
const router = express.Router();
const User = require("../models/user");
const UserProfile = require("../models/userProfile");

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  }
  req.flash("error", "You must be logged in to view this page.");
  res.redirect("/login");
};

// Route to view user profile
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username }).populate('profile');
    if (!user || !user.profile) {
      req.flash("info", "Please complete your profile.");
      return res.redirect("/profile/edit");
    }
    res.render("profile", { profile: user.profile });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Internal server error");
  }
});

// Route to render profile edit form
router.get("/edit", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username }).populate('profile');
    res.render("edit-profile", { profile: user.profile || {} });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Internal server error");
  }
});

// Route to handle profile update
router.post("/edit", isAuthenticated, async (req, res) => {
  try {
    const { firstName, lastName, email, bio } = req.body;
    let user = await User.findOne({ username: req.session.username });

    if (!user) {
      req.flash("error", "User not found.");
      return res.redirect("/");
    }

    let profile = await UserProfile.findOne({ username: req.session.username });
    if (!profile) {
      profile = new UserProfile({ username: req.session.username, firstName, lastName, email, bio });
      user.profile = profile._id;
    } else {
      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.email = email;
      profile.bio = bio;
    }

    await profile.save();
    await user.save();

    req.flash("success", "Profile updated successfully.");
    res.redirect("/profile");
  } catch (error) {
    console.error("Error updating profile:", error);
    req.flash("error", "Error updating profile.");
    res.redirect("/profile/edit");
  }
});

module.exports = router;