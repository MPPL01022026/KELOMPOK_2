const Model_r = require("../models/model_r");

exports.login = async (req, res) => {
  try {
    const model = new Model_r(req);
    const result = await model.login();

    // Jika terjadi error dari model
    if (result.status === "error") {
      return res.status(400).json({
        message: result.message,
      });
    }

    // Jika sukses
    return res.status(200).json(result);
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
