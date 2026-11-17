"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert(
      "sepeda",
      [
        {
          id_sepeda: "HZB-001",
          nama_sepeda: "Seli Urban Fold",
          jenis: "Sepeda Lipat",
          status: "Tersedia",
          kondisi: "Baik",
          createdAt: now,
          updatedAt: now,
        },
        {
          id_sepeda: "HZB-002",
          nama_sepeda: "Trail Master MTB",
          jenis: "Sepeda Gunung",
          status: "Tersedia",
          kondisi: "Baik",
          createdAt: now,
          updatedAt: now,
        },
        {
          id_sepeda: "HZB-003",
          nama_sepeda: "Velocity Road Bike",
          jenis: "Sepeda Balap",
          status: "Tersedia",
          kondisi: "Baik",
          createdAt: now,
          updatedAt: now,
        },
        {
          id_sepeda: "HZB-004",
          nama_sepeda: "Easy Hybrid",
          jenis: "Sepeda Hybrid",
          status: "Tersedia",
          kondisi: "Baik",
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("sepeda", null, {});
  },
};
