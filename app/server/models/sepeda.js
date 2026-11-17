"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Sepeda extends Model {
    static associate(models) {
      Sepeda.hasMany(models.Penyewaan, {
        foreignKey: "id_sepeda",
        as: "penyewaan",
      });
    }
  }

  Sepeda.init(
    {
      id_sepeda: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      nama_sepeda: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      jenis: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("Tersedia", "Disewa", "Tidak Tersedia"),
        allowNull: false,
        defaultValue: "Tersedia",
      },
      kondisi: {
        type: DataTypes.ENUM("Baik", "Perlu Perawatan", "Rusak"),
        allowNull: false,
        defaultValue: "Baik",
      },
    },
    {
      sequelize,
      modelName: "Sepeda",
      tableName: "sepeda",
    }
  );

  return Sepeda;
};
