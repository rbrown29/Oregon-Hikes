const express = require('express');
const router = express.Router();
const Trail = require('../models/trails.js'); 

// POST: Create a new trail
router.post('/trails', async (req, res) => {
    try {
        const trail = new Trail(req.body);
        const savedTrail = await trail.save();
        res.status(201).json(savedTrail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET: Retrieve all trails
router.get('/', async (req, res) => {
    try {
        const trails = await Trail.find();
        res.json(trails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Retrieve a single trail by id
router.get('/trails/:id', async (req, res) => {
    try {
        const trail = await Trail.findOne({ id: req.params.id });
        if (!trail) {
            return res.status(404).json({ message: 'Cannot find trail' });
        }
        res.json(trail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH: Update a trail by id
router.patch('/trails/:id', async (req, res) => {
    try {
        const trail = await Trail.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!trail) {
            return res.status(404).json({ message: 'Cannot find trail' });
        }
        res.json(trail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Delete a trail by id
router.delete('/trails/:id', async (req, res) => {
    try {
        const trail = await Trail.findOneAndDelete({ id: req.params.id });
        if (!trail) {
            return res.status(404).json({ message: 'Cannot find trail' });
        }
        res.json({ message: 'Trail deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
