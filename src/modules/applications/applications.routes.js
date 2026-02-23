const express = require("express");
const router = express.Router();
const controller = require("./applications.controller");
const auth = require("../../middleware/auth.middleware");

router.post("/:driveId", auth, controller.apply);
router.get("/mine", auth, controller.getMine);
router.patch("/optout/:applicationId", auth, controller.optOut);

module.exports = router;