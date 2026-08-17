const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// GET profile — public
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.getOrCreate();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PUT update profile — admin only
router.put('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const profile = await Profile.update(req.body);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
