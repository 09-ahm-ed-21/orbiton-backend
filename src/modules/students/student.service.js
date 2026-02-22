const repo = require("./student.repository");

async function createProfile(userId, data) {
  const existing = await repo.findByUserId(userId);
  if (existing) throw new Error("PROFILE_EXISTS");

  return repo.createProfile({ ...data, user_id: userId });
}

async function updateProfile(userId, data) {
  return repo.updateProfile(userId, data);
}

async function getOwnProfile(userId) {
  return repo.findByUserId(userId);
}

async function getProfileById(id) {
  return repo.findById(id);
}

module.exports = {
  createProfile,
  updateProfile,
  getOwnProfile,
  getProfileById
};