const express = require("express");
const router = express.Router();
const controller = require("./offers.controller");
const auth = require("../../middleware/auth.middleware");

router.post("/", auth, controller.issueOffer);
router.patch("/:id/respond", auth, controller.respondToOffer);

module.exports = router;