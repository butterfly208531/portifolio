const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Seble Mengistu' },
  title: { type: String, default: 'Full Stack Developer' },
  bio: { type: String, default: 'I craft clean, purposeful web experiences using the MERN stack.' },
  skills: { type: [String], default: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'HTML & CSS'] },
  github: { type: String, default: 'https://github.com' },
  linkedin: { type: String, default: 'https://linkedin.com' },
  email: { type: String, default: 'seblemen94@gmail.com' },
  avatar: { type: String, default: '' },
  yearsExperience: { type: Number, default: 1 },
  telegram: { type: String, default: '' },
  instagram: { type: String, default: '' },
});

module.exports = mongoose.model('Profile', profileSchema);
