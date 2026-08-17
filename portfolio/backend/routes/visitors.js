const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// POST increment visitor count
router.post('/increment', async (req, res) => {
  try {
    const count = await Visitor.increment();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update visitor count' });
  }
});

// GET current count without incrementing
router.get('/', async (req, res) => {
  try {
    const visitor = await Visitor.getOrCreate();
    res.json({ count: visitor?.count || 0 });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch visitor count' });
  }
});

module.exports = router;
