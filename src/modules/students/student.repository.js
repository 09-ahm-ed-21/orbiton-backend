const pool = require("../../config/db.postgres");

async function createProfile(data) {
  const result = await pool.query(
    `INSERT INTO student_profiles
     (user_id, full_name, department, program, year_of_study, cgpa, backlog_count)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING *`,
    [
      data.user_id,
      data.full_name,
      data.department,
      data.program,
      data.year_of_study,
      data.cgpa,
      data.backlog_count
    ]
  );

  return result.rows[0];
}

async function updateProfile(userId, updates) {
  const result = await pool.query(
    `UPDATE student_profiles
     SET full_name=$1,
         department=$2,
         program=$3,
         year_of_study=$4,
         cgpa=$5,
         backlog_count=$6,
         updated_at=NOW()
     WHERE user_id=$7
     RETURNING *`,
    [
      updates.full_name,
      updates.department,
      updates.program,
      updates.year_of_study,
      updates.cgpa,
      updates.backlog_count,
      userId
    ]
  );

  return result.rows[0];
}

async function findByUserId(userId) {
  const result = await pool.query(
    `SELECT * FROM student_profiles WHERE user_id=$1`,
    [userId]
  );
  return result.rows[0];
}

async function findById(id) {
  const result = await pool.query(
    `SELECT * FROM student_profiles WHERE id=$1`,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  createProfile,
  updateProfile,
  findByUserId,
  findById
};