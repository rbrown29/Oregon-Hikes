const express = require('express');
const router = express.Router();
const BikingTrail = require('../models/biking.js');

// CREATE - Add a new biking trail
router.post('/', async (req, res) => {
    const trail = new BikingTrail(req.body);
    try {
        const newTrail = await trail.save();
        res.status(201).json(newTrail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ - Get all biking trails
router.get('/', async (req, res) => {
    try {
        const trails = await BikingTrail.find();
        res.json(trails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ - Get a single biking trail by ID
router.get('/:id', getTrail, (req, res) => {
    res.json(res.trail);
});

// UPDATE - Update a biking trail
router.patch('/:id', getTrail, async (req, res) => {
    if (req.body.name != null) {
        res.trail.name = req.body.name;
    }
    try {
        const updatedTrail = await res.trail.save();
        res.json(updatedTrail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE - Delete a biking trail
router.delete('/:id', getTrail, async (req, res) => {
    try {
        await res.trail.remove();
        res.json({ message: 'Deleted Trail' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware to get a trail by ID
async function getTrail(req, res, next) {
    let trail;
    try {
        trail = await BikingTrail.findById(req.params.id);
        if (trail == null) {
            return res.status(404).json({ message: 'Cannot find trail' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.trail = trail;
    next();
}

module.exports = router;