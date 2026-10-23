"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Galeries", // 👈 Sesuaikan dengan nama tabel kamu di DB
      [
        {
          name: "beranda",
          image: "beranda.jpeg",
          deskripsi: "untuk di letakkan di beranda user.",
          time_stamp: "2025-02-20",
          adminId: 1, // Admin yang membuat event
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ikan",
          image: "ikan.jpeg",
          deskripsi:"gambar ikan di sungai.",
          time_stamp: "2025-03-10",
          adminId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "jalan_tangga",
          image: "jalan_tangga.jpeg",
          deskripsi: "jalan extream untuk sampai ke tujuan.",
          time_stamp: "2025-04-05",
          adminId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
          {
          name: "kemah",
          image: "kemah.jpeg",
          deskripsi: "perkemahan dekat dengan lokasi wisata.",
          time_stamp: "2025-05-25",
          adminId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
          {
          name: "penjelajah",
          image: "penjelajah.jpeg",
          deskripsi: "penjelajah yang ingin melihat spot yang bagus.",
          time_stamp: "2025-06-05",
          adminId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
          {
          name: "percikan",
          image: "percikan.jpeg",
          deskripsi: "percikan air terjun.",
          time_stamp: "2025-07-15",
          adminId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
          {
          name: "terjun",
          image: "terjun.jpeg",
          deskripsi: "air terjun yang indah.",
          time_stamp: "2025-08-10",
          adminId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Galeries", null, {});
  },
};
