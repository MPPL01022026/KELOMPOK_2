"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const existingAdmins = await queryInterface.sequelize.query(
      "SELECT id FROM admins WHERE username = 'admin' LIMIT 1",
      { type: Sequelize.QueryTypes.SELECT }
    );
    if (existingAdmins.length > 0) return;

    const hashedPasswordAdmin = await bcrypt.hash("admin", 10);

    await queryInterface.bulkInsert(
      "admins",
      [
        {
          id: 1,
          name: "Admin Hazza Bike",
          username: "admin",
          password: hashedPasswordAdmin,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admins", null, {});
  },
};
