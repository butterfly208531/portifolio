const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// GET all — public
router.get('/', async (req, res) => {
  try {
    const list = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.json(list);
  } catch { res.status(500).json({ error: 'Failed to fetch' }); }
});

// POST add — admin
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.json(exp);
  } catch { res.status(500).json({ error: 'Failed to create' }); }
});

// DELETE — admin
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Failed to delete' }); }
});

module.exports = router;
