const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

router.post("/", (request, response) => {
    User.findOne({ username: request.body.username }, (error, foundUser) => {
        if (foundUser === null) {
            console.log("user not found");
            response.redirect("/login");
        } else {
            const doesPasswordMatch = bcrypt.compareSync(request.body.password, foundUser.password);
            if (doesPasswordMatch) {
                request.session.username = foundUser.username;
                request.session.loggedIn = true; //  set loggedIn status here
                response.redirect("/");
            } else {
                console.log("password does not match");
                response.redirect("/login");
            }
        }
    });
});

module.exports = router;