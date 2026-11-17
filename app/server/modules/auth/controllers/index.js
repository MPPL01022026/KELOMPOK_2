const { Admin } = require("../../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.SECRET_KEY || "hazza-bike-dev-secret";

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username dan password harus diisi" });
    }

    const user = await Admin.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "User tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, name: user.name },
      SECRET_KEY,
      { expiresIn: "12h" }
    );

    return res.status(200).json({
      status: "success",
      message: "Login sukses",
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
