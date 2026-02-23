const express = require("express");
const router = express.Router();
const controller = require("./drives.controller");
const auth = require("../../middleware/auth.middleware");

router.post("/", auth, controller.create);
router.get("/", auth, controller.getAll);
router.get("/:id", auth, controller.getById);
router.patch("/:id/status", auth, controller.updateStatus);
router.patch("/:id", auth, controller.update);

module.exports = router;