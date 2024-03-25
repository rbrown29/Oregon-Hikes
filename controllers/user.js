const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    // Password validation criteria
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
        req.flash('error', 'Password must be at least 6 characters long and include both numbers and letters.');
        return res.redirect('/signup');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, password: hashedPassword });
        const token = await newUser.generateAuthToken();
        res.cookie('token', token, { httpOnly: true });
        await newUser.save();
        req.flash('success', 'Account created successfully! Please login.');
        res.redirect('/login');
    } catch (error) {
        console.error('Signup error:', error);
        req.flash('error', 'An unexpected error occurred during signup.');
        res.redirect('/signup');
    }
});

module.exports = router;