const db = require("../../config/db.postgres");

async function createDrive(data) {
  const query = `
    INSERT INTO placement_drives (
      recruiter_id,
      title,
      description,
      min_cgpa,
      eligible_departments,
      package_offered,
      location,
      application_deadline,
      employment_type,
      max_backlogs,
      min_year_of_study,
      drive_start_date,
      drive_end_date,
      created_by,
      status
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,'DRAFT'
    )
    RETURNING *;
  `;

  const values = [
    data.recruiter_id,
    data.title,
    data.description,
    data.min_cgpa,
    data.eligible_departments,
    data.package_offered,
    data.location,
    data.application_deadline,
    data.employment_type,
    data.max_backlogs,
    data.min_year_of_study,
    data.drive_start_date,
    data.drive_end_date,
    data.created_by
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

async function findAll() {
  const result = await db.query(
    `SELECT * FROM placement_drives ORDER BY created_at DESC`
  );
  return result.rows;
}

async function findById(id) {
  const result = await db.query(
    `SELECT * FROM placement_drives WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

async function updateStatus(id, status) {
  const result = await db.query(
    `UPDATE placement_drives
     SET status = $1, updated_at = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING *`,
    [status, id]
  );
  return result.rows[0];
}

async function updateDrive(id, data) {
  const query = `
    UPDATE placement_drives
    SET
      title = $1,
      description = $2,
      min_cgpa = $3,
      eligible_departments = $4,
      package_offered = $5,
      location = $6,
      application_deadline = $7,
      employment_type = $8,
      max_backlogs = $9,
      min_year_of_study = $10,
      drive_start_date = $11,
      drive_end_date = $12,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $13
    RETURNING *;
  `;

  const values = [
    data.title,
    data.description,
    data.min_cgpa,
    data.eligible_departments,
    data.package_offered,
    data.location,
    data.application_deadline,
    data.employment_type,
    data.max_backlogs,
    data.min_year_of_study,
    data.drive_start_date,
    data.drive_end_date,
    id
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

module.exports = {
  createDrive,
  findAll,
  findById,
  updateStatus,
  updateDrive
};