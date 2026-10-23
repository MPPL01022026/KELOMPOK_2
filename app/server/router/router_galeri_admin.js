const express = require("express");
const router = express.Router();
const controller = require("../modules/galeri_admin/controllers/index.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const { body } = require("express-validator");

router.post(
  "/galeri/list",
  authMiddleware,
  [
    body("perpage")
      .notEmpty()
      .withMessage("Perpage Tidak Boleh Kosong")
      .isInt()
      .withMessage("Perpage Harus Angka"),

    body("pageNumber")
      .notEmpty()
      .withMessage("Page Number Tidak Boleh Kosong")
      .isInt()
      .withMessage("Page Number Harus Angka"),

    body("search").optional().isString().withMessage("Search Harus String"),
  ],
  controller.daftar_galeri_admin
);

module.exports = router;
