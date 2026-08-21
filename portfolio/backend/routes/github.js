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

async function getHiddenRepos() {
  const { data } = await supabase.from('github_overrides').select('repo_id');
  return new Set((data || []).map(r => r.repo_id));
}

// GET /api/github/repos — public, filters hidden
router.get('/repos', async (req, res) => {
  try {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    const projects = await fetchGitHubRepos();
    const hidden = await getHiddenRepos();
    const visible = projects.filter(p => !hidden.has(p._id));
    res.json(visible);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch GitHub repos' });
  }
});

// GET /api/github/repos/all — admin, shows all with hidden status
router.get('/repos/all', authMiddleware, adminOnly, async (req, res) => {
  try {
    const projects = await fetchGitHubRepos();
    const hidden = await getHiddenRepos();
    const result = projects.map(p => ({ ...p, hidden: hidden.has(p._id) }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch GitHub repos' });
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
