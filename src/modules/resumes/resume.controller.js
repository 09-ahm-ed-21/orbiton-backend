const service = require("./resume.service");

async function uploadResume(req, res) {
  try {
    const resume = await service.uploadResume(req.user.id, req.file);
    res.json({ success: true, data: resume });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getMyResumes(req, res) {
  try {
    const resumes = await service.getMyResumes(req.user.id);
    res.json({ success: true, data: resumes });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  uploadResume,
  getMyResumes
};