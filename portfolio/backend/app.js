const express = require('express');
const cors = require('cors');
const { seed } = require('./db/seed');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/visitors', require('./routes/visitors'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/services', require('./routes/services'));
app.use('/api/views', require('./routes/views'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

// Seed on cold start (idempotent — safe to run multiple times)
let seeded = false;
async function ensureSeeded() {
  if (!seeded) {
    await seed();
    seeded = true;
  }
}

module.exports = { app, ensureSeeded };
