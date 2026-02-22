const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/rbac.middleware");
const upload = require("../../middleware/upload.middleware");
const controller = require("./resume.controller");

router.post(
  "/upload",
  authMiddleware,
  roleMiddleware(["STUDENT"]),
  upload.single("resume"),
  controller.uploadResume
);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware(["STUDENT"]),
  controller.getMyResumes
);

module.exports = router;