const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// POST send a message — public
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: 'Message received!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// GET all messages — admin only
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
