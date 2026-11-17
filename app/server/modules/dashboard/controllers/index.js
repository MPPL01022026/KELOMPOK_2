const { Sepeda, Pelanggan, Penyewaan } = require("../../../models");

exports.armada = async (req, res) => {
  try {
    const [
      total_sepeda,
      tersedia,
      disewa,
      tidak_tersedia,
      baik,
      perlu_perawatan,
      rusak,
      total_pelanggan,
      total_transaksi,
      sewa_berjalan,
      sewa_selesai,
    ] = await Promise.all([
      Sepeda.count(),
      Sepeda.count({ where: { status: "Tersedia" } }),
      Sepeda.count({ where: { status: "Disewa" } }),
      Sepeda.count({ where: { status: "Tidak Tersedia" } }),
      Sepeda.count({ where: { kondisi: "Baik" } }),
      Sepeda.count({ where: { kondisi: "Perlu Perawatan" } }),
      Sepeda.count({ where: { kondisi: "Rusak" } }),
      Pelanggan.count(),
      Penyewaan.count(),
      Penyewaan.count({ where: { status_transaksi: "Berjalan" } }),
      Penyewaan.count({ where: { status_transaksi: "Selesai" } }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        sepeda: {
          total: total_sepeda,
          tersedia,
          disewa,
          tidak_tersedia,
        },
        kondisi: {
          baik,
          perlu_perawatan,
          rusak,
        },
        pelanggan: total_pelanggan,
        transaksi: {
          total: total_transaksi,
          berjalan: sewa_berjalan,
          selesai: sewa_selesai,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
