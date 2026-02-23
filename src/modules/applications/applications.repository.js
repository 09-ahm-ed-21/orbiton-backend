const db = require("../../config/db.postgres");

async function createApplication(studentId, driveId) {
  const query = `
    INSERT INTO applications (student_id, drive_id)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const result = await db.query(query, [studentId, driveId]);
  return result.rows[0];
}

async function findByStudentAndDrive(studentId, driveId) {
  const result = await db.query(
    `SELECT * FROM applications WHERE student_id=$1 AND drive_id=$2`,
    [studentId, driveId]
  );
  return result.rows[0];
}

async function findByStudent(studentId) {
  const result = await db.query(
    `SELECT * FROM applications WHERE student_id=$1 ORDER BY applied_at DESC`,
    [studentId]
  );
  return result.rows;
}

async function optOut(applicationId) {
  const result = await db.query(
    `UPDATE applications
     SET opted_out=true, updated_at=CURRENT_TIMESTAMP
     WHERE id=$1
     RETURNING *`,
    [applicationId]
  );
  return result.rows[0];
}

module.exports = {
  createApplication,
  findByStudentAndDrive,
  findByStudent,
  optOut
};