const service = require("./drives.service");

async function create(req, res) {
  try {
    const drive = await service.createDrive(req.user, req.body);
    res.json({ success: true, data: drive });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getAll(req, res) {
  try {
    const drives = await service.getAllDrives();
    res.json({ success: true, data: drives });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getById(req, res) {
  try {
    const drive = await service.getDriveById(req.params.id);
    res.json({ success: true, data: drive });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function updateStatus(req, res) {
  try {
    const drive = await service.changeStatus(
      req.params.id,
      req.body.status,
      req.user
    );
    res.json({ success: true, data: drive });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const drive = await service.updateDrive(
      req.params.id,
      req.body,
      req.user
    );
    res.json({ success: true, data: drive });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  create,
  getAll,
  getById,
  updateStatus,
  update
};