const Model_r = require("../models/model_r");
const { validationResult } = require("express-validator");

exports.daftar_news_user = async (req, res) => {
  // Cek validasi
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const model = new Model_r(req);
    const result = await model.daftar_news_user();

    // Tambahkan field 'image' otomatis dari name
    const resultWithUrl = result.map(item => ({
      id: item.id,
      title: item.title,
      deskripsi: item.deskripsi,
      image: `http://localhost:3001/uploads/news/${item.image}` // <-- URL gambar
    }));

    return res.json({
      success: true,
      data: resultWithUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
    });
  }
};
