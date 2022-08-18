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
      "Spots",
      [
        {
          ownerId: 1,
          address: "123 Disney Lane",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "App Academy",
          description: "Place where web developers are created",
          price: 123,
        },
        {
          ownerId: 1,
          address: "133 Hazelnut Hill",
          city: "Groton",
          state: "Connecticut",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Fight Club",
          description: "Place where tough people get tougher",
          price: 431,
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
      "Spots",
      {
        address: { [Op.in]: ["123 Disney Lane", "133 Hazelnut Hill"] },
      },
      {}
    );
  },
};
