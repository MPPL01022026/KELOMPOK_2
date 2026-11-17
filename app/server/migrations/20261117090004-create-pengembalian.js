"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pengembalian", {
      id_pengembalian: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_penyewaan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "penyewaan",
          key: "id_penyewaan",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      waktu_kembali: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      kondisi_kembali: {
        type: Sequelize.ENUM("Baik", "Perlu Perawatan", "Rusak"),
        allowNull: false,
      },
      catatan: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable("pengembalian");
  },
};
