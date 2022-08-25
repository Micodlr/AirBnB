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
    queryInterface.bulkInsert(
      "Bookings",
      [
        {
          spotId: 1,
          userId: 2,
          startDate: "2022-07-19",
          endDate: "2022-07-20",
        },
        {
          spotId: 1,
          userId: 2,
          startDate: "2022-11-19",
          endDate: "2022-11-20",
        },
        {
          spotId: 2,
          userId: 2,
          startDate: "2023-11-19",
          endDate: "2023-11-20",
        },
        {
          spotId: 4,
          userId: 3,
          startDate: "2023-02-19",
          endDate: "2023-02-22",
        },
        {
          spotId: 5,
          userId: 5,
          startDate: "2023-10-10",
          endDate: "2023-11-11",
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
    queryInterface.bulkDelete(
      "Bookings",
      {
        id: [1, 2, 3, 4, 5],
      },
      {}
    );
  },
};
