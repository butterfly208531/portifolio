const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// GET current count — public
router.get('/', async (req, res) => {
  try {
    const visitor = await Visitor.getOrCreate();
    res.json({ count: visitor?.count || 0 });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch visitor count' });
  }
});

// PUT set count — admin only
router.put('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const count = await Visitor.setCount(req.body.count);
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update visitor count' });
  }
});

module.exports = router;
