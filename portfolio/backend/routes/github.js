const express = require('express');
const router = express.Router();

const GITHUB_USERNAME = 'butterfly208531';

router.get('/repos', async (req, res) => {
  try {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
      { headers: { 'Accept': 'application/vnd.github.v3+json' } }
    );
    const repos = await response.json();
    const projects = repos
      .filter(r => !r.fork)
      .map(r => ({
        _id: r.id,
        title: r.name,
        description: r.description || 'No description',
        technologies: r.language ? [r.language] : [],
        githubUrl: r.html_url,
        liveUrl: r.homepage || '',
        order: 0,
      }));
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch GitHub repos' });
  }
});

module.exports = router;
