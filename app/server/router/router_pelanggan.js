const express = require("express");
const router = express.Router();
const controller = require("../modules/pelanggan/controllers/index.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/pelanggan", authMiddleware, controller.daftar);
router.post("/pelanggan", authMiddleware, controller.tambah);

module.exports = router;
