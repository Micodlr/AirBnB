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
          userId: 3,
          spotId: 1,
          review: "This was a great spot!",
          stars: 3,
        },
        {
          userId: 4,
          spotId: 2,
          review: "coooool spot!",
          stars: 4,
        },
        {
          userId: 2,
          spotId: 2,
          review: "This was a decent spot!",
          stars: 3,
        },

        {
          userId: 5,
          spotId: 3,
          review: "I lost all my savings!",
          stars: 1,
        },
        {
          userId: 4,
          spotId: 3,
          review: "I hit the jackpot!",
          stars: 5,
        },
        {
          userId: 5,
          spotId: 4,
          review: "FREE DRINKS!",
          stars: 5,
        },
        {
          userId: 5,
          spotId: 4,
          review: "plenty of ATM Machines",
          stars: 4,
        },
        {
          userId: 1,
          spotId: 5,
          review: "Free kicks to the head",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 5,
          review: "I learned that i cannot fight",
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
