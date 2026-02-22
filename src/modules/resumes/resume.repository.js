const pool = require("../../config/db.postgres");

async function insertResume(studentId, filePath) {
  const result = await pool.query(
    `INSERT INTO resumes (student_id, file_path)
     VALUES ($1,$2)
     RETURNING *`,
    [studentId, filePath]
  );

  return result.rows[0];
}

async function findByStudent(studentId) {
  const result = await pool.query(
    `SELECT * FROM resumes
     WHERE student_id=$1
     ORDER BY uploaded_at DESC`,
    [studentId]
  );

  return result.rows;
}

module.exports = {
  insertResume,
  findByStudent
};