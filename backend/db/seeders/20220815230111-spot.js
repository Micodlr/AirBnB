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
          address: "6008 Mission Gorge Road",
          city: "San Diego",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "10th Planet Jiu Jitsu",
          description:
            "Home to 10th Planet San Diego Jiu Jitsu, Boxing, Kickboxing, Mixed Martial Arts, Judo, Strength and Conditioning, and Kid's Programs",
          price: 123,
          previewImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzSYmc0o3jT1O5w071qEOTKsWj-Qj6pQz-uQ&usqp=CAU",
        },
        {
          ownerId: 1,
          address: "1083 Buddington Road",
          city: "Groton",
          state: "Connecticut",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "The Roughhouse",
          description: "Place where tough people get tougher",
          price: 60,
          previewImage:
            "https://cdn11.bigcommerce.com/s-4hhc0ugv6e/images/stencil/1280x1280/products/737/1652/PRO_MMA_CAGE_OFFICIAL_30_X_30_OCTAGON___27951.1544679716.JPG?c=2",
        },
        {
          ownerId: 2,
          address: "3670 S Las Vegas Blvd",
          city: "Las Vegas",
          state: "Nevada",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Caesars Palace",
          description: "Caesar does not live here",
          price: 1000,
          previewImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwjxsJh4triC69-ocsKDI7-J4pPys_kB6HUg&usqp=CAU",
        },
        {
          ownerId: 2,
          address: "3667 S Las Vegas Blvd",
          city: "Las Vegas",
          state: "Nevada",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Planet Hollywood",
          description:
            "Planet Hollywood, a world-renowned trademark established in 1991, continues to expand its brand into a wide array of dynamic ventures such as the new Planet Hollywood Resort & Casino in Las Vegas.",
          price: 900,
          previewImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwjxsJh4triC69-ocsKDI7-J4pPys_kB6HUg&usqp=CAU",
        },
        {
          ownerId: 3,
          address: "4055 West Sunset Road",
          city: "Las Vegas",
          state: "Nevada",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Xtreme Coutre",
          description:
            "Xtreme Couture MMA was founded by Randy Couture as his way to pass down the fighting skills and training principles he developed over the course of his hall-of-fame career. Over the past decade, it has become a favorite destination for people from all over the world striving to achieve their fitness, self-defense, and combat sports goals. No matter what your experience level, the elite training staff at XCMMA can help you maximize your potential.",
          price: 150,
          previewImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDaqM7qqEo54lPaL5sqdHBCxAwe8j2en-6Ew&usqp=CAU",
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
        address: {
          [Op.in]: [
            "6008 Mission Gorge Road",
            "1083 Buddington Road",
            "3670 S Las Vegas Blvd",
            "3667 S Las Vegas Blvd",
            "4055 West Sunset Road",
          ],
        },
      },
      {}
    );
  },
};
