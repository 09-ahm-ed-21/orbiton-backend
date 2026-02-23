const service = require("./applications.service");

async function apply(req, res) {
  try {
    const result = await service.applyToDrive(req.user, req.params.driveId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getMine(req, res) {
  try {
    const result = await service.getMyApplications(req.user);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function optOut(req, res) {
  try {
    const result = await service.optOut(req.user, req.params.applicationId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  apply,
  getMine,
  optOut
};