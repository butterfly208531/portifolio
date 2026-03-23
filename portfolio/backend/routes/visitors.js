const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');

// GET count + increment on each visit
router.post('/increment', async (req, res) => {
  try {
    let visitor = await Visitor.findOne();
    if (!visitor) {
      visitor = await Visitor.create({ count: 1 });
    } else {
      visitor.count += 1;
      await visitor.save();
    }
    res.json({ count: visitor.count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update visitor count' });
  }
});

// GET current count without incrementing
router.get('/', async (req, res) => {
  try {
    const visitor = await Visitor.findOne();
    res.json({ count: visitor?.count || 0 });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch visitor count' });
  }
});

module.exports = router;
