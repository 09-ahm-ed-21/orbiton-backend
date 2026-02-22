const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/rbac.middleware");

router.get(
  "/test",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  (req, res) => {
    res.json({ message: "Admin access granted" });
  }
);

module.exports = router;
