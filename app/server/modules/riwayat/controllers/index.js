const { Penyewaan, Sepeda, Pelanggan, Pengembalian } = require("../../../models");

exports.riwayat = async (req, res) => {
  try {
    const data = await Penyewaan.findAll({
      include: [
        { model: Sepeda, as: "sepeda" },
        { model: Pelanggan, as: "pelanggan" },
        { model: Pengembalian, as: "pengembalian" },
      ],
      order: [["waktu_sewa", "DESC"]],
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching riwayat:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
