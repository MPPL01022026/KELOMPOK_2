"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Events", // 👈 Sesuaikan dengan nama tabel kamu di DB
      [
        {
          name: "Festival Budaya Aceh",
          lokasi: "Lapangan Merdeka",
          deskripsi: "Acara tahunan menampilkan budaya, musik, dan tari Aceh.",
          event_date: "2025-02-20",
          adminId: 1, // Admin yang membuat event
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Seminar Teknologi Modern",
          lokasi: "Universitas Samudra - Aula Utama",
          deskripsi:
            "Seminar membahas perkembangan AI, IoT, dan teknologi digital.",
          event_date: "2025-03-10",
          adminId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lomba Foto Pemandangan",
          lokasi: "Pantai Kuala Gigieng",
          deskripsi: "Kompetisi fotografi dengan tema landscape dan alam.",
          event_date: "2025-04-05",
          adminId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Events", null, {});
  },
};
