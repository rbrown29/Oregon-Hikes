const express = require('express');
const router = express.Router();
const Hike = require('../models/hikes.js');

// CREATE - Add a new hike
router.post('/hikes', async (req, res) => {
    try {
        const newHike = new Hike(req.body);
        const savedHike = await newHike.save();
        res.status(201).json(savedHike);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ - Get all hikes
router.get('/', async (req, res) => {
    try {
        const hikes = await Hike.find();
        res.json(hikes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ - Get a single hike by ID
router.get('/hikes/:id', getHike, (req, res) => {
    res.json(res.hike);
});

// UPDATE - Update a hike
router.patch('/hikes/:id', getHike, async (req, res) => {
    if (req.body.name != null) {
        res.hike.name = req.body.name;
    }
    if (req.body.length != null) {
        res.hike.length = req.body.length;
    }

    try {
        const updatedHike = await res.hike.save();
        res.json(updatedHike);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE - Delete a hike
router.delete('/hikes/:id', getHike, async (req, res) => {
    try {
        await res.hike.remove();
        res.json({ message: 'Deleted Hike' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware to get hike by ID
async function getHike(req, res, next) {
    let hike;
    try {
        hike = await Hike.findById(req.params.id);
        if (hike == null) {
            return res.status(404).json({ message: 'Cannot find hike' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.hike = hike;
    next();
}

module.exports = router;
