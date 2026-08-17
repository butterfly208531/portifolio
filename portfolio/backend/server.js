const express = require('express');
const cors = require('cors');
require('dotenv').config();
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

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Seed admin / profile / visitor rows on boot
seed()
  .then(() => console.log('Supabase ready'))
  .catch((err) => {
    console.error('Seed error:', err.message);
    console.error('Make sure backend/.env has SUPABASE_URL and SUPABASE_SERVICE_KEY, and that backend/db/schema.sql was run in Supabase.');
  });
