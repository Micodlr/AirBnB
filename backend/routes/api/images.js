const express = require("express");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { Spot, User, Review, Image, Booking } = require("../../db/models");
const sequelize = require("sequelize");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();
router.delete(
  "/:imageId",
  [restoreUser, requireAuth],
  async (req, res, next) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;
    const image = await Image.findByPk(imageId);

    if (!image) {
      const err = new Error("Image couldn't be found");
      err.status = 404;
      return next(err);
    }
    if (image.userId !== userId) {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }
    image.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
);

module.exports = router;
