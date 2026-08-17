const { app, ensureSeeded } = require('../app');

module.exports = async (req, res) => {
  await ensureSeeded();
  return app(req, res);
};
