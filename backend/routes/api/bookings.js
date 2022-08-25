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

const validateBooking = [
  //   check("startDate")
  //     .exists({ checkFalsy: true })
  //     .isAfter(`${new Date()}`)
  //     .withMessage("StartDate cannot be on or before todays date"),
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
//PUT Update and return an existing booking.
router.put(
  "/:bookingId",
  [restoreUser, requireAuth, validateBooking],
  async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const user = req.user;
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);
    console.log(booking);

    //check booking
    if (!booking) {
      const err = new Error("Booking couldn't be found");
      err.status = 404;
      return next(err);
    }
    //check owner
    if (user.id !== booking.userId) {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }
    //check endDate
    let todaysDate = new Date();

    let endDateToCompare = new Date(endDate);
    // console.log(endDateToCompare);
    if (endDateToCompare <= todaysDate) {
      const err = new Error("Past bookings can't be modified");
      err.status = 403;
      return next(err);
    }

    //Check date availability
    const spotId = booking.spotId;
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
    booking.update({ startDate, endDate });
    res.json(booking);
  }
);

//DELETE Delete an existing booking
router.delete(
  "/:bookingId",
  [restoreUser, requireAuth],
  async (req, res, next) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.id;
    const booking = await Booking.findByPk(bookingId);
    const todaysDate = new Date();
    // console.log(booking.userId, spot.ownerId);
    if (!booking) {
      const err = new Error("Booking couldn't be found");
      err.status = 404;
      return next(err);
    }
    const spot = await Spot.findByPk(booking.spotId);
    if (booking.userId !== userId && userId !== spot.ownerId) {
      const err = new Error("Forbidden");
      err.status = 403;
      return next(err);
    }
    const bookingStartDate = new Date(booking.startDate);
    if (bookingStartDate <= todaysDate) {
      const err = new Error("Bookings that have been started can't be deleted");
      err.status = 403;
      return next(err);
    }
    booking.destroy();
    res.json({ message: "Successfully deleted", statusCode: 200 });
  }
);

module.exports = router;
