const repo = require("./applications.repository");
const driveRepo = require("../drives/drives.repository");
const studentRepo = require("../students/student.repository");

function checkEligibility(student, drive) {
  if (student.cgpa < drive.min_cgpa) return false;
  if (student.backlog_count > drive.max_backlogs) return false;
  if (!drive.eligible_departments.includes(student.department)) return false;
  if (student.year_of_study < drive.min_year_of_study) return false;
  return true;
}

async function applyToDrive(user, driveId) {
  if (user.role !== "STUDENT") {
    throw new Error("ONLY_STUDENT_CAN_APPLY");
  }

  const student = await studentRepo.findByUserId(user.id);
  if (!student) throw new Error("PROFILE_REQUIRED");

  const drive = await driveRepo.findById(driveId);
  if (!drive) throw new Error("DRIVE_NOT_FOUND");

  if (drive.status !== "PUBLISHED") {
    throw new Error("DRIVE_NOT_OPEN");
  }

  if (new Date(drive.application_deadline) <= new Date()) {
    throw new Error("DEADLINE_PASSED");
  }

  const existing = await repo.findByStudentAndDrive(student.id, driveId);
  if (existing) throw new Error("ALREADY_APPLIED");

  if (!checkEligibility(student, drive)) {
    throw new Error("NOT_ELIGIBLE");
  }

  return repo.createApplication(student.id, driveId);
}

async function getMyApplications(user) {
  if (user.role !== "STUDENT") {
    throw new Error("FORBIDDEN");
  }

  const student = await studentRepo.findByUserId(user.id);
  return repo.findByStudent(student.id);
}

async function optOut(user, applicationId) {
  if (user.role !== "STUDENT") {
    throw new Error("FORBIDDEN");
  }

  return repo.optOut(applicationId);
}

module.exports = {
  applyToDrive,
  getMyApplications,
  optOut
};