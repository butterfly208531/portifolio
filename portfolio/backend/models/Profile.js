const { supabase, mapRow } = require('../db/supabase');

const FIELD_MAP = {
  name: 'name',
  title: 'title',
  bio: 'bio',
  skills: 'skills',
  github: 'github',
  linkedin: 'linkedin',
  email: 'email',
  avatar: 'avatar',
  yearsExperience: 'years_experience',
  telegram: 'telegram',
  instagram: 'instagram',
  location: 'location',
};

function toUpdate(body) {
  const row = {};
  for (const [from, to] of Object.entries(FIELD_MAP)) {
    if (body[from] !== undefined) row[to] = body[from];
  }
  return row;
}

async function getOrCreate() {
  const { data, error } = await supabase.from('profiles').select('*').limit(1);
  if (error) throw error;
  if (data.length) return mapRow(data[0]);

  const { data: created, error: createError } = await supabase
    .from('profiles')
    .insert({})
    .select()
    .single();
  if (createError) throw createError;
  return mapRow(created);
}

async function update(body) {
  const current = await getOrCreate();
  const row = toUpdate(body);
  if (Object.keys(row).length === 0) return current;

  const { data, error } = await supabase
    .from('profiles')
    .update({ ...row, updated_at: new Date().toISOString() })
    .eq('id', current.id)
    .select()
    .single();
  if (error) throw error;
  return mapRow(data);
}

module.exports = { getOrCreate, update };
