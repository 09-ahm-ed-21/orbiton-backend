const pool = require("../../config/db.postgres");

async function findByEmail(email) {
  console.log("Searching email:", email);
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  console.log("Result:", result.rows);
  return result.rows[0];
}

async function assignRole(userId, roleName) {
  const role = await pool.query(
    "SELECT id FROM roles WHERE name = $1",
    [roleName]
  );

  await pool.query(
    "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)",
    [userId, role.rows[0].id]
  );
}

async function createUser(email, phone, password) {
  const result = await pool.query(
    "INSERT INTO users (email, password_hash_txt, ph_no) VALUES ($1, $2, $3) RETURNING *",
    [email, password, phone]
  );
  return result.rows[0];
}

async function insertResetToken(userId, token, expires) {
  await pool.query(
    `INSERT INTO password_resets (user_id, reset_token, expires_at)
     VALUES ($1, $2, $3)`,
    [userId, token, expires]
  );
}

async function findResetToken(token) {
  const result = await pool.query(
    `SELECT * FROM password_resets
     WHERE reset_token = $1`,
    [token]
  );
  return result.rows[0];
}

async function updatePassword(userId, hash) {
  await pool.query(
    `UPDATE users SET password_hash_txt = $1 WHERE id = $2`,
    [hash, userId]
  );
}

async function markTokenUsed(token) {
  await pool.query(
    `UPDATE password_resets SET used = true WHERE reset_token = $1`,
    [token]
  );
}

module.exports = { 
  findByEmail, 
  createUser, 
  insertResetToken, 
  findResetToken, 
  updatePassword,
  markTokenUsed,
  assignRole
};
