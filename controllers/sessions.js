const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
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

module.exports = router;