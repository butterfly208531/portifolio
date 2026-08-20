const express = require('express');
const router = express.Router();
const View = require('../models/View');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// POST log a view — public
router.post('/', async (req, res) => {
  try {
    await View.logVisit(req.body.visitorId || '');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to log view' });
  }
});

// GET stats — admin only
router.get('/stats', authMiddleware, adminOnly, async (req, res) => {
  try {
    const stats = await View.getStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
