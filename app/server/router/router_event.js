const express = require("express");
const router = express.Router();
const controller = require("../modules/event/controller/index.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/event/daftar_event", authMiddleware, controller.daftar_event);

module.exports = router;
