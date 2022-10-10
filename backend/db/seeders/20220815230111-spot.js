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
          address: "3730 S Las Vegas Blvd",
          city: "Las Vegas",
          state: "Nevada",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Aria Resort & Casino",
          description:
            "Whether it’s a show at Dolby Live or sporting event at T-Mobile arena, ARIA puts you in the center of all the best of Vegas entertainment.Connected to Park MGM, enjoy ease of access with only a 10-minute walk to both venues. From dinner and a show to a night cap that won’t disappoint, ARIA provides the perfect itinerary for a night to remember",
          price: 450,
          previewImage:
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/1d/91/27/corner-suite-panoramic.jpg?w=700&h=-1&s=1",
        },
        {
          ownerId: 1,
          address: "3708 S Las Vegas Blvd",
          city: "Las Vegas",
          state: "Nevada",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "The Cosmopolitan",
          description: "Place where tough people get tougher",
          price: 500,
          previewImage:
            "https://media.cntraveler.com/photos/598c972130e0b978de59297f/16:9/w_2560%2Cc_limit/EXCLUSIVE_Richmond-7321-4.jpg",
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
            "https://wheelchairtravel.org/wp-content/uploads/2021/01/caesars-lobby.jpg",
        },
        {
          ownerId: 2,
          address: "3600 S Las Vegas Blvd",
          city: "Las Vegas",
          state: "Nevada",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Bellagio",
          description:
            "Inspired by the villages of Europe, Bellagio Resort & Casino overlooks a Mediterranean-blue lake with fountains performing a magnificent ballet. You’ll discover that when you slow down, the world will rush past you and leave you with a moment all to yourself. This is the life.",

          price: 900,
          previewImage:
            "https://bellagio.mgmresorts.com/content/dam/MGM/bellagio/hotel/exterior/bellagio-exterior-hero-shot-pinwheels.tif",
        },
        {
          ownerId: 3,
          address: "3000 S Las Vegas Blvd",
          city: "Las Vegas",
          state: "Nevada",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Resorts World",
          description:
            "As the first integrated resort built on the Las Vegas Strip in over a decade, Resorts World Las Vegas (RWLV) seamlessly blends the technology and luxury appeal of an urban contemporary resort with the traditions and time-honored details of the international Resorts World brand. The sleek yet simple elegance of this new property was developed with the intention of bringing the elevated experience for which the Resorts World brand is known to the modern Las Vegas traveler seeking luxury, value and variety.",
          price: 200,
          previewImage:
            "https://www.rwlasvegas.com/wp-content/uploads/2021/10/exterior-2.jpg",
        },
        {
          ownerId: 3,
          address: "8 Freemont Street Experience",
          city: "Las Vegas",
          state: "Nevada",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Circa",
          description:
            "Time. There’s simply nothing more valuable. This is the truth that drives us to make the most of every moment. Rooted in the neon glow of the past, we celebrate living large in the now, and keep our eyes wide open to the future. Drawing on the best that has come before us, we are building a new legacy: one that turns the good times up to eleven and burns bright with the original spirit of Vegas. In a city where time disappears, we are the masters of these fleeting moments, creating experiences that electrify the soul and memories that will last forever. We go big. We go all night. And here, everyone is on the guest list. So get loose and get loud. This is Circa. The time of your life.",
          price: 200,
          previewImage:
            "https://www.circalasvegas.com/wp-content/uploads/2021/05/Circa_EndSuite_02_RyanGobuty-scaled.jpg",
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
