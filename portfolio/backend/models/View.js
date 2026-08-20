const { supabase } = require('../db/supabase');

async function logVisit(visitorId) {
  const { error } = await supabase
    .from('views')
    .insert({ visitor_id: visitorId || 'anonymous' });
  if (error) throw error;
}

async function getStats() {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  
  const weekDate = new Date(now);
  weekDate.setDate(weekDate.getDate() - weekDate.getDay());
  weekDate.setHours(0, 0, 0, 0);
  const startOfWeek = weekDate.toISOString();
  
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString();

  const [day, week, month, year, total] = await Promise.all([
    supabase.from('views').select('id', { count: 'exact', head: true }).gte('created_at', startOfDay),
    supabase.from('views').select('id', { count: 'exact', head: true }).gte('created_at', startOfWeek),
    supabase.from('views').select('id', { count: 'exact', head: true }).gte('created_at', startOfMonth),
    supabase.from('views').select('id', { count: 'exact', head: true }).gte('created_at', startOfYear),
    supabase.from('views').select('id', { count: 'exact', head: true }),
  ]);

  return {
    today: day.count || 0,
    thisWeek: week.count || 0,
    thisMonth: month.count || 0,
    thisYear: year.count || 0,
    total: total.count || 0,
  };
}

module.exports = { logVisit, getStats };
