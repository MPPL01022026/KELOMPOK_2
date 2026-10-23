const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const controller = require("../modules/galeri_user/controllers");

// POST /galeri/daftar-galeri
router.post(
  "/galeri/daftar_galeri",
  [
    body("perpage")
      .notEmpty().withMessage("Perpage Tidak Boleh Kosong")
      .isInt().withMessage("Perpage Harus Angka"),

    body("pageNumber")
      .notEmpty().withMessage("Page Number Tidak Boleh Kosong")
      .isInt().withMessage("Page Number Harus Angka"),

    body("search")
      .optional()
      .isString()
      .withMessage("Search Harus String"),
  ],
  controller.daftar_galeri_user
);

module.exports = router;
