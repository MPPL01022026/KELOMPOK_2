"use strict";

const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPasswordAdmin = await bcrypt.hash("admin", 10);
    const hashedPasswordStaff = await bcrypt.hash("staff", 10);

    await queryInterface.bulkInsert(
      "Admins",
      [
        {
          id: 1,
          name: "Super Admin",
          username: "admin",
          password: hashedPasswordAdmin,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Staff Backend",
          username: "staff",
          password: hashedPasswordStaff,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {});
  },
};
