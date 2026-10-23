"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.belongsTo(models.Admin, { foreignKey: "adminId", as: "admin" });
    }
  }

  News.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      deskripsi: DataTypes.TEXT,
      slug: DataTypes.STRING,
      date: DataTypes.DATE,
      adminId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "News",
    }
  );

  return News;
};
