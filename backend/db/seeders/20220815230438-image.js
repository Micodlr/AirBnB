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
    // await queryInterface.bulkInsert(
    //   "Images",
    //   [
    //     {
    //       userId: 2,
    //       imageableId: 1,
    //       url: "image url",
    //     },
    //   ],
    //   {}
    // );
    queryInterface.bulkInsert(
      "Images",
      [
        {
          userId: 2,
          imageableType: "spotImage",
          imageableId: 1,
          url: "https://disneyland.disney.go.com/destinations/disneyland/",
        },
        {
          userId: 2,
          imageableType: "reviewImage",
          imageableId: 2,
          url: "https://www.nbclosangeles.com/the-scene/encanto-magic-blooms-at-disneyland-park/2863453/",
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
      "Images",
      {
        imageableId: [1, 2],
      },
      {}
    );
  },
};
