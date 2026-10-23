"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Info extends Model {
    static associate(models) {
      Info.belongsTo(models.Admin, { foreignKey: "adminId", as: "admin" });
    }
  }

  Info.init(
    {
      adminId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Info",
    }
  );

  return Info;
};
