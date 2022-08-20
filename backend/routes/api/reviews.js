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
//POST Add an Image to a Review based on the Review's id

router.post(
  "/:reviewId/images",
  [restoreUser, requireAuth],
  async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);
    if (!review) {
      const err = new Error("Review couldn't be found");
      err.status = 404;
      return next(err);
    }
    if (req.user.id !== review.userId) {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }
    const images = await review.getImages();
    const imageCount = await Image.count({
      where: { imageableId: images[0].imageableId },
    });
    if (imageCount >= 10) {
      const err = new Error(
        "Maximum number of images for this resource was reached"
      );
      err.status = 403;
      return next(err);
    }
    const newImage = await review.createImage({
      url: req.body.url,
    });
    const { id, imageableId, url } = newImage;

    res.json({ id, imageableId, url });
    // const image = await review.createImage({ url: req.body.url });
    // const { id, imageableId, url } = image;
    // res.json(id, imageableId, url);
  }
);

//PUT Edit a Review
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
router.put(
  "/:reviewId",
  [restoreUser, requireAuth, validateReview],
  async (req, res, next) => {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    const { review, stars } = req.body;
    const reviewToEdit = await Review.findByPk(reviewId);
    if (userId !== reviewToEdit.userId) {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }
    if (!reviewToEdit) {
      const err = new Error("Review couldn't be found");
      err.status = 404;
      return next(err);
    }
    reviewToEdit.update({ review, stars });
    res.json(reviewToEdit);
  }
);
//DELETE Delete a Review
router.delete(
  "/:reviewId",
  [restoreUser, requireAuth],
  async (req, res, next) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;
    const review = await Review.findByPk(reviewId);
    if (!review) {
      const err = new Error("Review couldn't be found");
      err.status = 404;
      return next(err);
    }
    if (review.userId !== userId) {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }
    review.destroy();
    res.json({ message: "Successfully deleted", statusCode: 200 });
  }
);
module.exports = router;
