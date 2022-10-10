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

("We wanted to try something different and we spot this Thai restaurant with nice decorations that caught our attention. When we arrived, the host handed us a menu and we sat down very quickly, no wait. We ordered Thai chicken, fries and pad see ew. Thai chicken- It was good. It came with 2 sauces to dip in; sweet chili and fish sauce. Fries- It was very salty. We had to ask to get another one for less salt. It tasted okay. It wasn't delicious at all, lack of seasoning. Pad See Ew- It looked delicious posted on Yelp. But when I ate some, it was really salty. I never had ate a pad see ew that was salty before. We didn't ate most of it. So we had a lot of leftovers and we didn't want to take it with us because it was horrible. Service was slow. I am not going to come back again. Worst Thai restaurant I ever been to.");
