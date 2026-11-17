"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
