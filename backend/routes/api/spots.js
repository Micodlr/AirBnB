const express = require("express");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Spot, User, Review } = require("../../db/models");
const sequelize = require("sequelize");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//GET all spots /spots
router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll({
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("Reviews.stars")), "NumReviews"],
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "AvgStarRating"],
      ],
    },
    include: {
      model: Review,
      attributes: [],
    },
  });
  const owner = res.json(spots);
});

module.exports = router;
