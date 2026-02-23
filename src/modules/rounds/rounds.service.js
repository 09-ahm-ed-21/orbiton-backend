const repo = require("./rounds.repository");
const driveRepo = require("../drives/drives.repository");
const appRepo = require("../applications/applications.repository");
const db = require("../../config/db.postgres");

async function createRound(user, payload) {
  if (!["TPO","ADMIN"].includes(user.role)) {
    throw new Error("FORBIDDEN");
  }

  const drive = await driveRepo.findById(payload.drive_id);
  if (!drive) throw new Error("DRIVE_NOT_FOUND");

  if (drive.status === "CLOSED") {
    throw new Error("DRIVE_CLOSED");
  }

  const existingMax = await repo.getMaxSequence(payload.drive_id);

  if (existingMax && payload.sequence_number <= existingMax) {
    throw new Error("INVALID_SEQUENCE_NUMBER");
  }

  return repo.createRound(payload);
}

async function recordResult(user, payload) {
  if (!["TPO","RECRUITER","ADMIN"].includes(user.role)) {
    throw new Error("FORBIDDEN");
  }

  const result = await repo.insertRoundResult(payload);

  // Fetch drive & round
  const roundQuery = `
    SELECT dr.*, pd.id as drive_id
    FROM drive_rounds dr
    JOIN placement_drives pd ON dr.drive_id = pd.id
    WHERE dr.id=$1
  `;
  const roundData = await db.query(roundQuery, [payload.round_id]);
  const round = roundData.rows[0];

  if (payload.result_status === "FAILED" || payload.result_status === "ABSENT") {
    await db.query(
      `UPDATE applications
       SET status='REJECTED'
       WHERE drive_id=$1 AND student_id=$2`,
      [round.drive_id, payload.student_id]
    );
  }

  if (payload.result_status === "PASSED") {
    const maxSeq = await repo.getMaxSequence(round.drive_id);

    if (round.sequence_number === maxSeq) {
      await db.query(
        `UPDATE applications
         SET status='SELECTED'
         WHERE drive_id=$1 AND student_id=$2`,
        [round.drive_id, payload.student_id]
      );
    }
  }

  return result;
}

module.exports = {
  createRound,
  recordResult
};