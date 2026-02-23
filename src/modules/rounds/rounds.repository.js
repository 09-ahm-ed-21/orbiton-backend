const db = require("../../config/db.postgres");

async function createRound(data) {
  const query = `
    INSERT INTO drive_rounds (
      drive_id,
      round_name,
      sequence_number,
      round_type,
      scheduled_datetime,
      mode,
      location_or_link
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *;
  `;

  const values = [
    data.drive_id,
    data.round_name,
    data.sequence_number,
    data.round_type,
    data.scheduled_datetime,
    data.mode,
    data.location_or_link
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function getRoundsByDrive(driveId) {
  const result = await db.query(
    `SELECT * FROM drive_rounds
     WHERE drive_id=$1
     ORDER BY sequence_number ASC`,
    [driveId]
  );
  return result.rows;
}

async function updateRoundStatus(id, status) {
  const result = await db.query(
    `UPDATE drive_rounds
     SET status=$1
     WHERE id=$2
     RETURNING *`,
    [status, id]
  );
  return result.rows[0];
}

async function insertRoundResult(data) {
  const query = `
    INSERT INTO round_results (
      round_id,
      student_id,
      result_status,
      score,
      remarks
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
  `;

  const values = [
    data.round_id,
    data.student_id,
    data.result_status,
    data.score,
    data.remarks
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function getMaxSequence(driveId) {
  const result = await db.query(
    `SELECT MAX(sequence_number) as max_seq
     FROM drive_rounds
     WHERE drive_id=$1`,
    [driveId]
  );
  return result.rows[0].max_seq;
}

module.exports = {
  createRound,
  getRoundsByDrive,
  updateRoundStatus,
  insertRoundResult,
  getMaxSequence
};