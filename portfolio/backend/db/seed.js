const bcrypt = require('bcryptjs');
const { supabase } = require('./supabase');

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'seble';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Seble2024';

// Ensure the admin account exists (resets credentials to match the old
// Mongo behavior of force-resetting the admin on every boot).
async function seedAdmin() {
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('username', ADMIN_USERNAME)
    .maybeSingle();

  if (existing) {
    await supabase.from('users').delete().eq('id', existing.id);
  }

  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const { error } = await supabase
    .from('users')
    .insert({ username: ADMIN_USERNAME, password: hashed, role: 'admin' });

  if (error) throw error;
  console.log('Admin account ready');
}

// Ensure a single profile row exists (defaults handled by the DB).
async function seedProfile() {
  const { data, error } = await supabase.from('profiles').select('id').limit(1);
  if (error) throw error;
  if (!data.length) {
    const { error: insertError } = await supabase.from('profiles').insert({});
    if (insertError) throw insertError;
  }
}

// Ensure a single visitor counter row exists.
async function seedVisitor() {
  const { data, error } = await supabase.from('visitors').select('id').limit(1);
  if (error) throw error;
  if (!data.length) {
    const { error: insertError } = await supabase.from('visitors').insert({ count: 0 });
    if (insertError) throw insertError;
  }
}

async function seed() {
  await seedAdmin();
  await seedProfile();
  await seedVisitor();
}

module.exports = { seed };
