"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.Admin, { foreignKey: "adminId", as: "admin" });
    }
  }

  Event.init(
    {
      name: DataTypes.STRING,
      lokasi: DataTypes.STRING,
      deskripsi: DataTypes.TEXT,
      event_date: DataTypes.DATE,
      adminId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );

  return Event;
};
