const { Sepeda, Penyewaan } = require("../../../models");
const { Op } = require("sequelize");

const STATUS = ["Tersedia", "Disewa", "Tidak Tersedia"];
const KONDISI = ["Baik", "Perlu Perawatan", "Rusak"];

exports.daftar = async (req, res) => {
  try {
    const { search, status, kondisi } = req.query;
    const where = {};

    if (status) where.status = status;
    if (kondisi) where.kondisi = kondisi;
    if (search) {
      where[Op.or] = [
        { id_sepeda: { [Op.like]: `%${search}%` } },
        { nama_sepeda: { [Op.like]: `%${search}%` } },
        { jenis: { [Op.like]: `%${search}%` } },
      ];
    }

    const data = await Sepeda.findAll({
      where,
      order: [["id_sepeda", "ASC"]],
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching sepeda:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.detail = async (req, res) => {
  try {
    const data = await Sepeda.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Sepeda tidak ditemukan" });
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching detail sepeda:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.tambah = async (req, res) => {
  try {
    const { id_sepeda, nama_sepeda, jenis, status, kondisi } = req.body;

    if (!id_sepeda || !nama_sepeda) {
      return res
        .status(400)
        .json({ message: "ID sepeda dan nama sepeda wajib diisi" });
    }

    if (status && !STATUS.includes(status)) {
      return res.status(400).json({ message: "Status sepeda tidak valid" });
    }
    if (kondisi && !KONDISI.includes(kondisi)) {
      return res.status(400).json({ message: "Kondisi sepeda tidak valid" });
    }

    const exists = await Sepeda.findByPk(id_sepeda);
    if (exists) {
      return res.status(409).json({ message: "ID sepeda sudah digunakan" });
    }

    const data = await Sepeda.create({
      id_sepeda,
      nama_sepeda,
      jenis: jenis || null,
      status: status || "Tersedia",
      kondisi: kondisi || "Baik",
    });

    return res.status(201).json({
      success: true,
      message: "Sepeda berhasil ditambahkan",
      data,
    });
  } catch (error) {
    console.error("Error menambah sepeda:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.edit = async (req, res) => {
  try {
    const data = await Sepeda.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Sepeda tidak ditemukan" });
    }

    const { nama_sepeda, jenis } = req.body;
    await data.update({
      nama_sepeda: nama_sepeda ?? data.nama_sepeda,
      jenis: jenis !== undefined ? jenis : data.jenis,
    });

    return res.status(200).json({
      success: true,
      message: "Sepeda berhasil diperbarui",
      data,
    });
  } catch (error) {
    console.error("Error mengubah sepeda:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.hapus = async (req, res) => {
  try {
    const data = await Sepeda.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Sepeda tidak ditemukan" });
    }

    const totalTransaksi = await Penyewaan.count({
      where: { id_sepeda: req.params.id },
    });
    if (totalTransaksi > 0) {
      return res.status(409).json({
        message:
          "Sepeda tidak bisa dihapus karena sudah memiliki riwayat transaksi",
      });
    }

    await data.destroy();
    return res.status(200).json({ message: "Sepeda berhasil dihapus" });
  } catch (error) {
    console.error("Error menghapus sepeda:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!STATUS.includes(status)) {
      return res.status(400).json({ message: "Status sepeda tidak valid" });
    }

    const data = await Sepeda.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Sepeda tidak ditemukan" });
    }

    await data.update({ status });
    return res.status(200).json({
      success: true,
      message: "Status sepeda berhasil diperbarui",
      data,
    });
  } catch (error) {
    console.error("Error mengubah status sepeda:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.updateKondisi = async (req, res) => {
  try {
    const { kondisi } = req.body;
    if (!KONDISI.includes(kondisi)) {
      return res.status(400).json({ message: "Kondisi sepeda tidak valid" });
    }

    const data = await Sepeda.findByPk(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Sepeda tidak ditemukan" });
    }

    await data.update({ kondisi });
    return res.status(200).json({
      success: true,
      message: "Kondisi sepeda berhasil diperbarui",
      data,
    });
  } catch (error) {
    console.error("Error mengubah kondisi sepeda:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
