const {
  Pengembalian,
  Penyewaan,
  Sepeda,
  sequelize,
} = require("../../../models");

const KONDISI = ["Baik", "Perlu Perawatan", "Rusak"];

exports.catat = async (req, res) => {
  const { id_penyewaan, kondisi_kembali, catatan } = req.body;

  if (!id_penyewaan || !kondisi_kembali) {
    return res
      .status(400)
      .json({ message: "Transaksi dan kondisi kembali wajib diisi" });
  }
  if (!KONDISI.includes(kondisi_kembali)) {
    return res.status(400).json({ message: "Kondisi kembali tidak valid" });
  }

  const t = await sequelize.transaction();
  try {
    const penyewaan = await Penyewaan.findByPk(id_penyewaan, {
      transaction: t,
    });

    if (!penyewaan) {
      await t.rollback();
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }
    if (penyewaan.status_transaksi === "Selesai") {
      await t.rollback();
      return res.status(409).json({ message: "Transaksi sudah selesai" });
    }

    const data = await Pengembalian.create(
      {
        id_penyewaan,
        kondisi_kembali,
        catatan: catatan || null,
        waktu_kembali: new Date(),
      },
      { transaction: t }
    );

    await Penyewaan.update(
      { status_transaksi: "Selesai" },
      { where: { id_penyewaan }, transaction: t }
    );

    const statusBaru =
      kondisi_kembali === "Baik" ? "Tersedia" : "Tidak Tersedia";
    await Sepeda.update(
      { status: statusBaru, kondisi: kondisi_kembali },
      { where: { id_sepeda: penyewaan.id_sepeda }, transaction: t }
    );

    await t.commit();
    return res.status(201).json({
      success: true,
      message: "Pengembalian berhasil dicatat",
      data,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error mencatat pengembalian:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
