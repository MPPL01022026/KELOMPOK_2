const express = require("express");
const router = express.Router();
const controller = require("../modules/dashboard/controllers/index.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/dashboard/armada", authMiddleware, controller.armada);

module.exports = router;
