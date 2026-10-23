const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Cek header Authorization tersedia
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Tidak ada token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Simpan data user ke req agar bisa dipakai di route
    req.user = decoded;

    next(); // lanjut ke route berikutnya
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid atau expired" });
  }
};

module.exports = authMiddleware;
