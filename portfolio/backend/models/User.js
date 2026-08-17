const bcrypt = require('bcryptjs');
const { supabase, mapRow } = require('../db/supabase');

async function findByUsername(username) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : null;
}

async function create({ username, password, role = 'visitor' }) {
  const hashed = await bcrypt.hash(password, 10);
  const { data, error } = await supabase
    .from('users')
    .insert({ username, password: hashed, role })
    .select()
    .single();
  if (error) throw error;
  return mapRow(data);
}

async function deleteByUsername(username) {
  const { error } = await supabase.from('users').delete().eq('username', username);
  if (error) throw error;
}

async function comparePassword(user, plain) {
  return bcrypt.compare(plain, user.password);
}

module.exports = { findByUsername, create, deleteByUsername, comparePassword };
