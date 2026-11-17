const express = require("express");
const router = express.Router();
const controller = require("../modules/riwayat/controllers/index.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/riwayat", authMiddleware, controller.riwayat);

module.exports = router;
