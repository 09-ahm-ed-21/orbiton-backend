const service = require("./student.service");

async function createProfile(req, res) {
  try {
    const profile = await service.createProfile(req.user.id, req.body);
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateProfile(req, res) {
  try {
    const profile = await service.updateProfile(req.user.id, req.body);
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getOwnProfile(req, res) {
  const profile = await service.getOwnProfile(req.user.id);
  res.json({ success: true, data: profile });
}

async function getProfileById(req, res) {
  const profile = await service.getProfileById(req.params.id);
  res.json({ success: true, data: profile });
}

module.exports = {
  createProfile,
  updateProfile,
  getOwnProfile,
  getProfileById
};