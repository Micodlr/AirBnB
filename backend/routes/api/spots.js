const express = require("express");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Spot, User, Review, Image, Booking } = require("../../db/models");
const sequelize = require("sequelize");

const { check, query } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .isNumeric({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .isNumeric({ checkFalsy: true })
    .withMessage("Longtitude is not valid."),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .isInt({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

//POST Create a Booking from a Spot based on the Spot's id
const validateBooking = [
  // check("startDate")
  //   .exists({ checkFalsy: true })
  //   .isAfter(`${new Date()}`)
  //   .withMessage("StartDate cannot be on or before todays date"),
  check("endDate").custom((endDate, { req }) => {
    if (req.body.startDate >= endDate) {
      throw new Error("EndDate cannot be on or before startDate");
    } else {
      return true;
    }
  }),
  // .exists({ checkFalsy: true })
  // .isAfter(req.body.startDate)
  // .withMessage("endDate cannot be on or before startDate"),
  handleValidationErrors,
];
router.post(
  "/:spotId/bookings",
  [restoreUser, requireAuth, validateBooking],
  async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      return next(err);
    }

    if (userId == spot.ownerId) {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }
    //Check date availability
    const startDateBooked = await Booking.findOne({
      where: { spotId, startDate },
    });
    const endDateBooked = await Booking.findOne({
      where: { spotId, endDate },
    });
    if (startDateBooked || endDateBooked) {
      const errors = {};
      const err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );
      err.status = 403;
      if (startDateBooked) {
        errors.startDate = "Start date conflictts with an existing booking";
      }
      if (endDateBooked) {
        errors.endDate = "End date conflictts with an existing booking";
      }
      err.errors = errors;

      return next(err);
    }
    const newBooking = await spot.createBooking({
      userId,
      startDate,
      endDate,
    });
    res.json(newBooking);
  }
);

//GET Get all Bookings for a Spot based on the Spot's id
router.get(
  "/:spotId/bookings",
  [restoreUser, requireAuth],
  async (req, res, next) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    //SpotCheck
    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      return next(err);
    }

    //Check owner
    if (spot.ownerId !== req.user.id) {
      const bookings = await Booking.findAll({
        where: { spotId },
        attributes: ["spotId", "startDate", "endDate"],
      });

      return res.json({ Bookings: bookings });
    }

    // const user = req.user;
    // const { id, firstName, lastName } = req.user;
    // const owner = { id, firstName, lastName };

    // const userBooking = await user.getBookings();
    // userBooking.unshift({ User: owner });
    // return res.json({ Bookings: userBooking });
    const bookings = await Booking.findAll({
      where: { spotId },
      include: { model: User, attributes: ["id", "firstName", "lastName"] },
    });
    res.json({ Bookings: bookings });
  }
);

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),

  handleValidationErrors,
];
//POST Create a Review for a Spot based on the Spot's id
router.post(
  "/:spotId/reviews",
  [restoreUser, requireAuth, validateReview],
  async (req, res, next) => {
    const { review, stars } = req.body;
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const spotCheck = await Spot.findOne({ where: { id: spotId } });

    if (!spotCheck) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      return next(err);
    }
    const reviewCheck = await Review.findOne({ where: { spotId, userId } });

    if (reviewCheck) {
      const err = new Error("User already has a review for this spot");
      err.status = 403;
      return next(err);
    }

    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars,
    });
    res.json(newReview);
  }
);

//GET Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res, next) => {
  const { spotId } = req.params;
  const spotCheck = await Spot.findByPk(spotId);
  if (!spotCheck) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }
  const review = await Review.findAll({
    where: { spotId },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: Image, attributes: ["id", "imageableId", "url"] },
    ],
  });

  res.json({ Reviews: review });
});

//POST Add an Image to a Spot based on the Spot's id
router.post(
  "/:spotId/images",
  [restoreUser, requireAuth],
  async (req, res, next) => {
    const userId = req.user.id;
    // const { url } = req.body;
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      return next(err);
    }
    if (userId !== spot.ownerId) {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }
    const image = await spot.createImage({ userId, url: req.body.url });
    // const result = await Image.findByPk(image.id);
    // res.json(result);

    // console.log(image);
    const { id, imageableId, url } = image;
    res.json({ id, imageableId, url });
  }
);

//PUT Edit a Spot
router.put(
  "/:spotId",
  [validateSpot, restoreUser, requireAuth],
  async (req, res, next) => {
    const spotId = req.params.spotId;
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    const spot = await Spot.findByPk(spotId, {
      attributes: { exclude: ["previewImage"] },
    });

    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      return next(err);
    }

    if (req.user.id !== spot.ownerId) {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }
    spot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    res.json(spot);
  }
);

//GET all spots /spots
const validateQueryFilters = [
  query("page")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("Page size must be greater than or equal to 0"),
  query("size")
    .optional()
    .isInt({ min: 0, max: 20 })
    .withMessage("Size must be greater than or equal to 0"),
  query("maxLat")
    .optional()
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Maximum latitude is invalid"),
  query("minLat")
    .optional()
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Minimum latitude is invalid"),
  query("minLng")
    .optional()
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  query("maxLng")
    .optional()
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Maximum longitude is invalid"),
  query("minPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  query("maxPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),

  handleValidationErrors,
];

router.get("/", [validateQueryFilters], async (req, res, next) => {
  //   const spots = await Spot.findAll();
  let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;

  const limit = size || 20;
  let offset = limit * ((page || 1) - 1);
  let pageToDisplay = page || 1;

  // if (pageToDisplay === 0 || pageToDisplay === 1) {
  //   pageToDisplay = 1;
  // }

  const spots = await Spot.findAll({
    attributes: {
      include: [
        [
          sequelize.fn(
            "ROUND",
            sequelize.fn("AVG", sequelize.col("Reviews.stars")),
            1
          ),
          "avgRating",
        ],
      ],
    },

    group: "Spot.id",
    include: [{ model: Review, attributes: [] }],
    limit,
    offset,
    subQuery: false,
  });

  res.json({ Spots: spots, page: Number(pageToDisplay), size: Number(limit) });
});

//POST /spots Create a Spot
router.post(
  "/",
  [restoreUser, requireAuth, validateSpot],
  async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findByPk(id);
    // console.log(user);
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    } = req.body;
    const newSpot = await user.createSpot({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    //   const newSpot = await Spot.create({
    //     ownerId,
    //     address,
    //     city,
    //     state,
    //     country,
    //     lat,
    //     lng,
    //     name,
    //     description,
    //     price,
    //   });

    res.json(newSpot);
  }
);

//GET by spot id
router.get("/:spotId", async (req, res, next) => {
  const spotId = req.params.spotId;
  const spotCheck = await Spot.findByPk(spotId);
  if (!spotCheck) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    // err.errors = { email: "User with that email already exists" };
    return next(err);
  }

  const spot = await Spot.findByPk(spotId, {
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("Reviews.stars")), "NumReviews"],
        [
          sequelize.fn(
            "ROUND",
            sequelize.fn("AVG", sequelize.col("Reviews.stars")),
            1
          ),
          "AvgStarRating",
        ],
      ],
    },
    include: [
      { model: Review, attributes: [] },
      { model: Image, attributes: ["id", "imageableId", "url"] },
      { model: User, as: "Owner", attributes: ["id", "firstName", "lastName"] },
    ],
    group: ["Owner.id", "Spot.id", "Images.id"],
  });

  res.json(spot);
});

//DELETE Delete a Spot
router.delete(
  "/:spotId",
  [restoreUser, requireAuth],
  async (req, res, next) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      return next(err);
    }
    if (userId !== spot.ownerId) {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }
    await spot.destroy();
    res.json({ message: "Successfully deleted", statusCode: 200 });
  }
);
module.exports = router;
