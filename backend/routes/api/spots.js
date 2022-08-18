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
router.post("/", restoreUser, async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findByPk(id);
  console.log(user);
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
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
});

//GET by spot id
router.get("/:spotId", async (req, res, next) => {
  const spotId = req.params.spotId;
  const spotCheck = await Spot.findByPk(spotId);
  if (!spotCheck) {
    const err = new Error("Spot couldn't be found");
    console.log("hello");
    err.status = 404;
    // err.errors = { email: "User with that email already exists" };
    next(err);
  }

  const spot = await Spot.findByPk(spotId, {
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("Reviews.stars")), "NumReviews"],
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "AvgStarRating"],
      ],
    },
    include: [
      { model: Review, attributes: [] },
      { model: Image, attributes: ["id", "imageableId", "url"] },
      { model: User, attributes: ["id", "firstName", "lastName"] },
    ],
  });

  res.json(spot);
});
module.exports = router;
