const db = require("../../config/db.postgres");

async function createOffer(data) {
  const query = `
    INSERT INTO offers (
      student_id,
      drive_id,
      offer_date,
      package,
      joining_date
    )
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
  `;

  const values = [
    data.student_id,
    data.drive_id,
    data.offer_date,
    data.package,
    data.joining_date
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function findOffer(studentId, driveId) {
  const result = await db.query(
    `SELECT * FROM offers WHERE student_id=$1 AND drive_id=$2`,
    [studentId, driveId]
  );
  return result.rows[0];
}

async function updateOfferStatus(id, status) {
  const result = await db.query(
    `UPDATE offers SET offer_status=$1 WHERE id=$2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
}

async function getOffersByStudent(studentId) {
  const result = await db.query(
    `SELECT * FROM offers WHERE student_id=$1`,
    [studentId]
  );
  return result.rows;
}

module.exports = {
  createOffer,
  findOffer,
  updateOfferStatus,
  getOffersByStudent
};