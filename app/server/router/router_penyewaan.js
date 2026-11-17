const express = require("express");
const router = express.Router();
const controller = require("../modules/penyewaan/controllers/index.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/penyewaan", authMiddleware, controller.daftar);
router.get("/penyewaan/:id", authMiddleware, controller.detail);
router.post("/penyewaan", authMiddleware, controller.buat);

module.exports = router;
