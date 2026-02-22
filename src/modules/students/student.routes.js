const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/rbac.middleware");
const controller = require("./student.controller");

router.post(
  "/profile",
  authMiddleware,
  roleMiddleware(["STUDENT"]),
  controller.createProfile
);

router.patch(
  "/profile",
  authMiddleware,
  roleMiddleware(["STUDENT"]),
  controller.updateProfile
);

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(["STUDENT"]),
  controller.getOwnProfile
);

router.get(
  "/profile/:id",
  authMiddleware,
  roleMiddleware(["ADMIN", "TPO", "RECRUITER", "FACULTY"]),
  controller.getProfileById
);

module.exports = router;