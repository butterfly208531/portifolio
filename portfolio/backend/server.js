const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/visitors', require('./routes/visitors'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

// Start server regardless, then connect to MongoDB
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    // Auto-create admin account if it doesn't exist
    const User = require('./models/User');
    try {
      // Force reset admin password
      await User.deleteOne({ username: 'seble' });
      await User.create({ username: 'seble', password: 'Seble2024', role: 'admin' });
      console.log('Admin account reset');
    } catch (err) {
      console.error('Error creating admin:', err.message);
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));
