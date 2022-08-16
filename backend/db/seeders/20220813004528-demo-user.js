"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@gmail.com",
          username: "JohnSmith",
          password: bcrypt.hashSync("secret password"),
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@gmail.com",
          username: "JaneSmith",
          password: bcrypt.hashSync("password"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["JaneSmith", "JohnSmith"] },
      },
      {}
    );
  },
};
