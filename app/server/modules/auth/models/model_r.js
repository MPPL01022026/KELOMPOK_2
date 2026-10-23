const { Admin } = require("../../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

class Model_r {
  constructor(req) {
    this.req = req;
  }

  async login() {
    const { username, password } = this.req.body;

    // Validasi input
    if (!username || !password) {
      return { status: "error", message: "Username dan password harus diisi" };
    }

    // Cari user
    const user = await Admin.findOne({ where: { username } });
    if (!user) {
      return { status: "error", message: "User tidak ditemukan" };
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: "error", message: "Password salah" };
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        name: user.name,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return {
      status: "success",
      message: "Login sukses",
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    };
  }
}

module.exports = Model_r;
