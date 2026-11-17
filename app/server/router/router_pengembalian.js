const express = require("express");
const router = express.Router();
const controller = require("../modules/pengembalian/controllers/index.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.post("/pengembalian", authMiddleware, controller.catat);

module.exports = router;
