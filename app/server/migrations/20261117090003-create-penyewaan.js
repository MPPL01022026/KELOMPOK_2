"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("penyewaan", {
      id_penyewaan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_sepeda: {
        type: Sequelize.STRING(20),
        allowNull: false,
        references: {
          model: "sepeda",
          key: "id_sepeda",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      id_pelanggan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pelanggan",
          key: "id_pelanggan",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      id_pengelola: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "admins",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      waktu_sewa: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      batas_waktu: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tarif: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 30000,
      },
      status_transaksi: {
        type: Sequelize.ENUM("Berjalan", "Selesai"),
        allowNull: false,
        defaultValue: "Berjalan",
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
    await queryInterface.dropTable("penyewaan");
  },
};
