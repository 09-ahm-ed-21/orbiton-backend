const express = require("express");
const router = express.Router();
const controller = require("./rounds.controller");
const auth = require("../../middleware/auth.middleware");

router.post("/", auth, controller.createRound);
router.post("/result", auth, controller.recordResult);

module.exports = router;