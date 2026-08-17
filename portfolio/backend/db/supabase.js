const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('SUPABASE_URL or SUPABASE_SERVICE_KEY is missing. Check backend/.env');
}

const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder-key'
);

// Convert a Supabase row into the shape the frontend expects
// (Mongo-style _id, createdAt/updatedAt instead of id/created_at/updated_at).
function mapRow(row) {
  if (!row) return null;
  const { id, created_at, updated_at, ...fields } = row;
  const doc = { ...fields, id, _id: id };
  if (created_at) doc.createdAt = created_at;
  if (updated_at) doc.updatedAt = updated_at;
  return doc;
}

module.exports = { supabase, mapRow };
