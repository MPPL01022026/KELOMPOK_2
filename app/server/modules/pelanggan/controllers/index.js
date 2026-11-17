const { Pelanggan } = require("../../../models");
const { Op } = require("sequelize");

exports.daftar = async (req, res) => {
  try {
    const { search } = req.query;
    const where = {};

    if (search) {
      where[Op.or] = [
        { nama: { [Op.like]: `%${search}%` } },
        { no_hp: { [Op.like]: `%${search}%` } },
        { no_identitas: { [Op.like]: `%${search}%` } },
      ];
    }

    const data = await Pelanggan.findAll({
      where,
      order: [["id_pelanggan", "DESC"]],
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching pelanggan:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.tambah = async (req, res) => {
  try {
    const { nama, no_hp, alamat, no_identitas } = req.body;

    if (!nama) {
      return res.status(400).json({ message: "Nama pelanggan wajib diisi" });
    }

    const data = await Pelanggan.create({
      nama,
      no_hp: no_hp || null,
      alamat: alamat || null,
      no_identitas: no_identitas || null,
    });

    return res.status(201).json({
      success: true,
      message: "Pelanggan berhasil ditambahkan",
      data,
    });
  } catch (error) {
    console.error("Error menambah pelanggan:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
