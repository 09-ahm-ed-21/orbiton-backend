const repo = require("./drives.repository");

const ALLOWED_STATUSES = ["DRAFT", "PUBLISHED", "CLOSED", "CANCELLED"];

const STATUS_TRANSITIONS = {
  DRAFT: ["PUBLISHED"],
  PUBLISHED: ["CLOSED", "CANCELLED"],
  CLOSED: [],
  CANCELLED: []
};

async function createDrive(user, payload) {
  if (!["TPO", "RECRUITER", "ADMIN"].includes(user.role)) {
    throw new Error("FORBIDDEN");
  }

  if (payload.min_cgpa < 0 || payload.min_cgpa > 10) {
    throw new Error("INVALID_CGPA_RANGE");
  }

  if (!Array.isArray(payload.eligible_departments)) {
    throw new Error("DEPARTMENTS_MUST_BE_ARRAY");
  }

  if (new Date(payload.application_deadline) <= new Date()) {
    throw new Error("INVALID_DEADLINE");
  }

  payload.created_by = user.id;

  return repo.createDrive(payload);
}

async function getAllDrives() {
  return repo.findAll();
}

async function getDriveById(id) {
  const drive = await repo.findById(id);
  if (!drive) throw new Error("NOT_FOUND");
  return drive;
}

async function changeStatus(id, newStatus, user) {
  if (!["TPO", "ADMIN"].includes(user.role)) {
    throw new Error("FORBIDDEN");
  }

  if (!ALLOWED_STATUSES.includes(newStatus)) {
    throw new Error("INVALID_STATUS");
  }

  const drive = await repo.findById(id);
  if (!drive) throw new Error("NOT_FOUND");

  if (!STATUS_TRANSITIONS[drive.status].includes(newStatus)) {
    throw new Error("INVALID_STATUS_TRANSITION");
  }

  return repo.updateStatus(id, newStatus);
}

async function updateDrive(id, payload, user) {
  if (!["TPO", "RECRUITER", "ADMIN"].includes(user.role)) {
    throw new Error("FORBIDDEN");
  }

  const drive = await repo.findById(id);
  if (!drive) throw new Error("NOT_FOUND");

  if (drive.status !== "DRAFT") {
    throw new Error("ONLY_DRAFT_CAN_BE_EDITED");
  }

  return repo.updateDrive(id, payload);
}

module.exports = {
  createDrive,
  getAllDrives,
  getDriveById,
  changeStatus,
  updateDrive
};