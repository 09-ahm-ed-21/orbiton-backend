const service = require("./rounds.service");

async function createRound(req, res) {
  try {
    const result = await service.createRound(req.user, req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function recordResult(req, res) {
  try {
    const result = await service.recordResult(req.user, req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createRound,
  recordResult
};