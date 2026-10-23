"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * The `models/index` file akan otomatis manggil ini.
     */
    static associate(models) {
      // 1 Admin bisa buat banyak Event
      Admin.hasMany(models.Event, { foreignKey: "adminId", as: "events" });

      // 1 Admin bisa buat banyak News
      Admin.hasMany(models.News, { foreignKey: "adminId", as: "news" });

      // 1 Admin bisa buat banyak Galery
      Admin.hasMany(models.Galery, { foreignKey: "adminId", as: "galeries" });

      // 1 Admin bisa buat banyak Info
      Admin.hasMany(models.Info, { foreignKey: "adminId", as: "infos" });
    }
  }

  Admin.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );

  return Admin;
};
