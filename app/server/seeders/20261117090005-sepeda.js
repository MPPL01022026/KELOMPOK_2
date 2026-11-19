"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const bikes = [
      {
        id_sepeda: "HZB-001",
        nama_sepeda: "Seli Urban Fold",
        jenis: "Sepeda Lipat",
        status: "Tersedia",
        kondisi: "Baik",
      },
      {
        id_sepeda: "HZB-002",
        nama_sepeda: "Trail Master MTB",
        jenis: "Sepeda Gunung",
        status: "Tersedia",
        kondisi: "Baik",
      },
      {
        id_sepeda: "HZB-003",
        nama_sepeda: "Velocity Road Bike",
        jenis: "Sepeda Balap",
        status: "Tersedia",
        kondisi: "Baik",
      },
      {
        id_sepeda: "HZB-004",
        nama_sepeda: "Easy Hybrid",
        jenis: "Sepeda Hybrid",
        status: "Tersedia",
        kondisi: "Baik",
      },
    ];

    for (const bike of bikes) {
      const existing = await queryInterface.sequelize.query(
        "SELECT id_sepeda FROM sepeda WHERE id_sepeda = :id LIMIT 1",
        {
          replacements: { id: bike.id_sepeda },
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      if (existing.length > 0) {
        await queryInterface.bulkUpdate(
          "sepeda",
          { ...bike, updatedAt: now },
          { id_sepeda: bike.id_sepeda }
        );
      } else {
        await queryInterface.bulkInsert("sepeda", [{
          ...bike,
          createdAt: now,
          updatedAt: now,
        }]);
      }
    }
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("sepeda", null, {});
  },
};
