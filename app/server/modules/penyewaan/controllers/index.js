const {
  Penyewaan,
  Sepeda,
  Pelanggan,
  Pengembalian,
  sequelize,
} = require("../../../models");

const DURASI_JAM = 6;
const TARIF = 30000;

exports.daftar = async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status_transaksi: status } : {};

    const data = await Penyewaan.findAll({
      where,
      include: [
        { model: Sepeda, as: "sepeda" },
        { model: Pelanggan, as: "pelanggan" },
      ],
      order: [["waktu_sewa", "DESC"]],
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching penyewaan:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.detail = async (req, res) => {
  try {
    const data = await Penyewaan.findByPk(req.params.id, {
      include: [
        { model: Sepeda, as: "sepeda" },
        { model: Pelanggan, as: "pelanggan" },
        { model: Pengembalian, as: "pengembalian" },
      ],
    });

    if (!data) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching detail penyewaan:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.buat = async (req, res) => {
  const { id_sepeda, id_pelanggan } = req.body;

  if (!id_sepeda || !id_pelanggan) {
    return res
      .status(400)
      .json({ message: "Sepeda dan pelanggan wajib dipilih" });
  }

  const t = await sequelize.transaction();
  try {
    const sepeda = await Sepeda.findByPk(id_sepeda, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!sepeda) {
      await t.rollback();
      return res.status(404).json({ message: "Sepeda tidak ditemukan" });
    }
    if (sepeda.status !== "Tersedia") {
      await t.rollback();
      return res
        .status(409)
        .json({ message: "Sepeda sedang disewa atau tidak tersedia" });
    }

    const pelanggan = await Pelanggan.findByPk(id_pelanggan, {
      transaction: t,
    });
    if (!pelanggan) {
      await t.rollback();
      return res.status(404).json({ message: "Pelanggan tidak ditemukan" });
    }

    const waktu_sewa = new Date();
    const batas_waktu = new Date(
      waktu_sewa.getTime() + DURASI_JAM * 60 * 60 * 1000
    );

    const data = await Penyewaan.create(
      {
        id_sepeda,
        id_pelanggan,
        id_pengelola: req.user.id,
        waktu_sewa,
        batas_waktu,
        tarif: TARIF,
        status_transaksi: "Berjalan",
      },
      { transaction: t }
    );

    await Sepeda.update(
      { status: "Disewa" },
      { where: { id_sepeda }, transaction: t }
    );

    await t.commit();
    return res.status(201).json({
      success: true,
      message: "Penyewaan berhasil dibuat",
      data,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error membuat penyewaan:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
