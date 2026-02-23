const jwt = require("jsonwebtoken");
const db = require("../config/db.postgres");

async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;

    if(!header) {
      return res.status(401).json({error:"NO_TOKEN"});
    }
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const roleQuery = `
      SELECT r.name
      FROM user_roles ur
      JOIN roles r ON ur.role_id = r.id
      WHERE ur.user_id = $1
      LIMIT 1;
    `;

    const result = await db.query(roleQuery, [decoded.id]);

    if (!result.rows.length) {
      return res.status(403).json({ error: "NO_ROLE_ASSIGNED" });
    }

    req.user = {
      id: decoded.id,
      role: result.rows[0].name
    };

    next();

  } catch(err) {
    return res.status(401).json({error:"INVALID_TOKEN"});
  }
}

module.exports = authMiddleware;
