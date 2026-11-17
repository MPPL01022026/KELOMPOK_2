"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pengembalian extends Model {
    static associate(models) {
      Pengembalian.belongsTo(models.Penyewaan, {
        foreignKey: "id_penyewaan",
        as: "penyewaan",
      });
    }
  }

  Pengembalian.init(
    {
      id_pengembalian: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_penyewaan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      waktu_kembali: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      kondisi_kembali: {
        type: DataTypes.ENUM("Baik", "Perlu Perawatan", "Rusak"),
        allowNull: false,
      },
      catatan: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Pengembalian",
      tableName: "pengembalian",
    }
  );

  return Pengembalian;
};
