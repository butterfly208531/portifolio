const express = require('express');
const router = express.Router();
const { supabase } = require('../db/supabase');
const { authMiddleware, adminOnly } = require('../middleware/auth');

const GITHUB_USERNAME = 'butterfly208531';

async function fetchGitHubRepos() {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`,
    { headers: { 'Accept': 'application/vnd.github.v3+json' } }
  );
  const repos = await response.json();
  return repos
    .filter(r => !r.fork)
    .map(r => ({
      _id: String(r.id),
      title: r.name,
      description: r.description || 'No description',
      technologies: r.language ? [r.language] : [],
      githubUrl: r.html_url,
      liveUrl: r.homepage || '',
      order: 0,
    }));
}

async function getOverrides() {
  const { data } = await supabase.from('github_overrides').select('repo_id, hidden, description');
  const map = {};
  (data || []).forEach(r => { map[r.repo_id] = r; });
  return map;
}

// GET /api/github/repos — public, filters hidden, uses custom descriptions
router.get('/repos', async (req, res) => {
  try {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    const projects = await fetchGitHubRepos();
    const overrides = await getOverrides();
    const visible = projects
      .filter(p => !overrides[p._id]?.hidden)
      .map(p => ({ ...p, description: overrides[p._id]?.description || p.description }));
    res.json(visible);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch GitHub repos' });
  }
});

// GET /api/github/repos/all — admin, shows all with hidden status and custom description
router.get('/repos/all', authMiddleware, adminOnly, async (req, res) => {
  try {
    const projects = await fetchGitHubRepos();
    const overrides = await getOverrides();
    const result = projects.map(p => ({
      ...p,
      description: overrides[p._id]?.description || p.description,
      hidden: !!overrides[p._id]?.hidden,
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch GitHub repos' });
  }
});

// PUT /api/github/repos/:id — admin, update description
router.put('/repos/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { description } = req.body;
    await supabase
      .from('github_overrides')
      .upsert({ repo_id: req.params.id, description }, { onConflict: 'repo_id' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update description' });
  }
});

// POST /api/github/repos/:id/hide — admin, hide a repo
router.post('/repos/:id/hide', authMiddleware, adminOnly, async (req, res) => {
  try {
    await supabase.from('github_overrides').upsert({ repo_id: req.params.id, hidden: true });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to hide repo' });
  }
});

// DELETE /api/github/repos/:id/hide — admin, unhide a repo
router.delete('/repos/:id/hide', authMiddleware, adminOnly, async (req, res) => {
  try {
    await supabase.from('github_overrides').delete().eq('repo_id', req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to unhide repo' });
  }
});

module.exports = router;
