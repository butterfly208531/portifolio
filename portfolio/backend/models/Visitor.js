const { supabase } = require('../db/supabase');

async function get() {
  const { data, error } = await supabase.from('visitors').select('*').limit(1);
  if (error) throw error;
  return data[0] || null;
}

async function getOrCreate() {
  const existing = await get();
  if (existing) return existing;

  const { data, error } = await supabase
    .from('visitors')
    .insert({ count: 0 })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function increment() {
  const visitor = await getOrCreate();
  const next = visitor.count + 1;
  const { data, error } = await supabase
    .from('visitors')
    .update({ count: next, updated_at: new Date().toISOString() })
    .eq('id', visitor.id)
    .select()
    .single();
  if (error) throw error;
  return data.count;
}

module.exports = { getOrCreate, increment };
