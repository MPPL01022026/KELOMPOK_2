const express = require("express");
const router = express.Router();
const controller = require("../modules/sepeda/controllers/index.js");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get("/sepeda", authMiddleware, controller.daftar);
router.get("/sepeda/:id", authMiddleware, controller.detail);
router.post("/sepeda", authMiddleware, controller.tambah);
router.put("/sepeda/:id", authMiddleware, controller.edit);
router.delete("/sepeda/:id", authMiddleware, controller.hapus);
router.patch("/sepeda/:id/status", authMiddleware, controller.updateStatus);
router.patch("/sepeda/:id/kondisi", authMiddleware, controller.updateKondisi);

module.exports = router;
