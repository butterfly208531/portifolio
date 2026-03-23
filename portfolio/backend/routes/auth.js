const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function signToken(user) {
  const secret = process.env.JWT_SECRET || 'fallback_secret_change_me';
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    secret,
    { expiresIn: '7d' }
  );
}

// POST /api/auth/register  (first-time setup only — disable after creating admin)
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: 'Username already taken' });
    const user = await User.create({ username, password, role: role || 'visitor' });
    res.status(201).json({ token: signToken(user), role: user.role });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ token: signToken(user), role: user.role, username: user.username });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
