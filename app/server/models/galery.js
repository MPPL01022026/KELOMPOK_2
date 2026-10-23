"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Galery extends Model {
    static associate(models) {
      Galery.belongsTo(models.Admin, { foreignKey: "adminId", as: "admin" });
    }
  }

  Galery.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      deskripsi: DataTypes.TEXT,
      time_stamp: DataTypes.DATE,
      adminId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Galery",
    }
  );

  return Galery;
};
