"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sepeda", {
      id_sepeda: {
        type: Sequelize.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      nama_sepeda: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      jenis: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("Tersedia", "Disewa", "Tidak Tersedia"),
        allowNull: false,
        defaultValue: "Tersedia",
      },
      kondisi: {
        type: Sequelize.ENUM("Baik", "Perlu Perawatan", "Rusak"),
        allowNull: false,
        defaultValue: "Baik",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("sepeda");
  },
};
