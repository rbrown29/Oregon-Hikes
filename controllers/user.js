const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

router.post("/", (request, response) => {
    // Encrypt the password
    const hashedPassword = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10));
    const user = new User({
        username: request.body.username,
        password: hashedPassword,
    });

    // Use promise syntax
    user.save()
        .then((createdUser) => {
            console.log(request.body);
            request.session.username = createdUser.username;
            response.redirect("/");
        })
        .catch((error) => {
            console.log(error);
            // Handle the error, e.g., by sending a response to the client
            response.status(500).send("An error occurred");
        });
});

module.exports = router;
