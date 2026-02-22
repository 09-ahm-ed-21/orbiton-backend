const pool = require("../config/db.postgres");

function roleMiddleware(allowedRoles) {
  return async (req, res, next) => {
    const result = await pool.query(
      `SELECT r.name FROM roles r
       JOIN user_roles ur ON r.id = ur.role_id
       WHERE ur.user_id = $1`,
      [req.user.id]
    );

    const roles = result.rows.map(r => r.name);

    const authorized = roles.some(role =>
      allowedRoles.includes(role)
    );

    if (!authorized) {
      return res.status(403).json({ error: "FORBIDDEN" });
    }

    next();
  };
}

module.exports = roleMiddleware;
