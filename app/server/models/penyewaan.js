"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Penyewaan extends Model {
    static associate(models) {
      Penyewaan.belongsTo(models.Admin, {
        foreignKey: "id_pengelola",
        as: "pengelola",
      });
      Penyewaan.belongsTo(models.Sepeda, {
        foreignKey: "id_sepeda",
        as: "sepeda",
      });
      Penyewaan.belongsTo(models.Pelanggan, {
        foreignKey: "id_pelanggan",
        as: "pelanggan",
      });
      Penyewaan.hasOne(models.Pengembalian, {
        foreignKey: "id_penyewaan",
        as: "pengembalian",
      });
    }
  }

  Penyewaan.init(
    {
      id_penyewaan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_sepeda: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      id_pelanggan: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_pengelola: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      waktu_sewa: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      batas_waktu: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tarif: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 30000,
      },
      status_transaksi: {
        type: DataTypes.ENUM("Berjalan", "Selesai"),
        allowNull: false,
        defaultValue: "Berjalan",
      },
    },
    {
      sequelize,
      modelName: "Penyewaan",
      tableName: "penyewaan",
    }
  );

  return Penyewaan;
};
