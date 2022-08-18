"use strict";

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
      "Reviews",
      [
        {
          userId: 2,
          spotId: 1,
          review: "This was an awesome spot!",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 1,
          review: "This was a great spot!",
          stars: 3,
        },
        {
          userId: 2,
          spotId: 2,
          review: "This was a cool spot!",
          stars: 3,
        },
        {
          userId: 2,
          spotId: 2,
          review: "This was a ordinary spot!",
          stars: 2,
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
    await queryInterface.bulkDelete(
      "Reviews",
      {
        id: 1,
      },
      {}
    );
  },
};
