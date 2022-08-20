const express = require("express");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Spot, User, Review, Image } = require("../../db/models");
const sequelize = require("sequelize");

const { check } = require("express-validator");
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
    .isNumeric({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

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
    include: { model: Image },
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

    console.log(image);
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
    const spot = await Spot.findByPk(spotId);

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
router.get("/", async (req, res, next) => {
  //   const spots = await Spot.findAll();
  const spots = await Spot.findAll({
    attributes: {
      include: [
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
      ],
    },
    group: "Spot.id",
    include: [{ model: Review, attributes: [] }],
  });
  res.json({ Spots: spots });
});

//POST /spots Create a Spot
router.post(
  "/",
  [restoreUser, requireAuth, validateSpot],
  async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findByPk(id);
    console.log(user);
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
    console.log("hello");
    err.status = 404;
    // err.errors = { email: "User with that email already exists" };
    return next(err);
  }

  const spot = await Spot.findByPk(spotId, {
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("Reviews.stars")), "NumReviews"],
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "AvgStarRating"],
      ],
    },
    group: "Images.id",
    include: [
      { model: Review, attributes: [] },
      { model: Image, attributes: ["id", "imageableId", "url"] },
      { model: User, attributes: ["id", "firstName", "lastName"] },
    ],
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
