const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// GET all — public
router.get('/', async (req, res) => {
  try {
    const list = await Service.list();
    res.json(list);
  } catch { res.status(500).json({ error: 'Failed to fetch' }); }
});

// POST add — admin
router.post('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const svc = await Service.create(req.body);
    res.json(svc);
  } catch { res.status(500).json({ error: 'Failed to create' }); }
});

// PUT update order — admin
router.put('/:id/order', authMiddleware, adminOnly, async (req, res) => {
  try {
    const updated = await Service.updateOrder(req.params.id, req.body.order);
    res.json(updated);
  } catch { res.status(500).json({ error: 'Failed to update order' }); }
});

// DELETE — admin
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await Service.deleteById(req.params.id);
    res.json({ success: true });
  } catch { res.status(500).json({ error: 'Failed to delete' }); }
});

module.exports = router;
