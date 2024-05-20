const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/user.js");

router.post("/", async (request, response) => {
    try {
        const foundUser = await User.findOne({ username: request.body.username });
        if (!foundUser) {
            console.log("user not found");
            request.flash("error", "User not found");
            response.redirect("/login");
        } else {
            const doesPasswordMatch = bcrypt.compareSync(request.body.password, foundUser.password);
            if (doesPasswordMatch) {
                foundUser.loginCount += 1;
                await foundUser.save();
                request.session.username = foundUser.username;
                request.session.loggedIn = true; // set loggedIn status here
                response.redirect("/");
            } else {
                console.log("password does not match");
                request.flash("error", "Password does not match");
                response.redirect("/login");
            }
        }
    } catch (error) {
        console.error("Error finding user:", error);
        response.status(500).send("Internal server error");
    }
});

router.post("/reset-password", async (req, res) => {
    if (!req.session.loggedIn) {
        req.flash("error", "You must be logged in to reset your password.");
        return res.redirect("/login");
    }

    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findOne({ username: req.session.username });

        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect("/login");
        }

        const doesPasswordMatch = bcrypt.compareSync(currentPassword, user.password);
        if (!doesPasswordMatch) {
            req.flash("error", "Current password is incorrect.");
            return res.redirect("/reset-password");
        }

        if (newPassword !== confirmPassword) {
            req.flash("error", "New passwords do not match.");
            return res.redirect("/reset-password");
        }

        user.password = bcrypt.hashSync(newPassword, 10);
        await user.save();

        req.flash("success", "Your password has been updated. Please log in.");
        return res.redirect("/login");
    } catch (error) {
        console.error("Error in password reset route:", error);
        return res.status(500).send("Internal server error");
    }
});

module.exports = router;