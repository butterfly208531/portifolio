require('dotenv').config();
const { app, ensureSeeded } = require('./app');

const PORT = process.env.PORT || 5000;

ensureSeeded()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Seed error:', err.message);
    console.error('Make sure backend/.env has SUPABASE_URL and SUPABASE_SERVICE_KEY, and that backend/db/schema.sql was run in Supabase.');
    process.exit(1);
  });
