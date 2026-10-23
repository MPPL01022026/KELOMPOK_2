const Model_r = require("../models/model_r");

exports.daftar_galeri_admin = async (req, res) => {
  try {
    const model = new Model_r(req);
    const result = await model.daftar_galeri_admin();

    return res.json({
      success: true,
      data: result.data, // langsung keluar
      total: result.total,
      perpage: result.perpage,
      page: result.page,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan",
    });
  }
};
