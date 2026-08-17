const { supabase, mapRow } = require('../db/supabase');

async function list() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data.map(mapRow);
}

async function create({ name, email, message }) {
  const { data, error } = await supabase
    .from('messages')
    .insert({ name, email, message })
    .select()
    .single();
  if (error) throw error;
  return mapRow(data);
}

module.exports = { list, create };
