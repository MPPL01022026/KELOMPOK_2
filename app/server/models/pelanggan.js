"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pelanggan extends Model {
    static associate(models) {
      Pelanggan.hasMany(models.Penyewaan, {
        foreignKey: "id_pelanggan",
        as: "penyewaan",
      });
    }
  }

  Pelanggan.init(
    {
      id_pelanggan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nama: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      no_hp: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      alamat: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      no_identitas: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Pelanggan",
      tableName: "pelanggan",
    }
  );

  return Pelanggan;
};
