const { supabase, mapRow } = require('../db/supabase');

const FIELD_MAP = {
  title: 'title',
  company: 'company',
  duration: 'duration',
  type: 'type',
  achievements: 'achievements',
  order: 'order',
};

function toInsert(body) {
  const row = {};
  for (const [from, to] of Object.entries(FIELD_MAP)) {
    if (body[from] !== undefined) row[to] = body[from];
  }
  return row;
}

async function list() {
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data.map(mapRow);
}

async function create(body) {
  const { data, error } = await supabase
    .from('experiences')
    .insert(toInsert(body))
    .select()
    .single();
  if (error) throw error;
  return mapRow(data);
}

async function deleteById(id) {
  const { error } = await supabase.from('experiences').delete().eq('id', id);
  if (error) throw error;
}

module.exports = { list, create, deleteById };
