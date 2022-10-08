const express = require("express");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User, Spot, Review, Image, Booking } = require("../../db/models");
const sequelize = require("sequelize");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

//LOGOUT
router.delete("/user", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

//GET Get all of the Current User's Bookings
router.get(
  "/user/bookings",
  [restoreUser, requireAuth],
  async (req, res, next) => {
    const userId = req.user.id;
    const bookings = await Booking.findAll({
      where: { userId: userId },
      include: [
        {
          model: Spot,
          attributes: { exclude: ["description", "createdAt", "updatedAt"] },
        },
      ],
    });
    res.json({ Bookings: bookings });
  }
);

//GET Get all Reviews of the Current User
router.get("/user/reviews", restoreUser, async (req, res, next) => {
  // console.log(req.user.id);
  const reviews = await Review.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: Spot,
        attributes: { exclude: ["createdAt", "updatedAt", "previewImage"] },
      },
      { model: Image },
      { model: User, attributes: ["id", "firstName", "lastName"] },
    ],
  });
  res.json({ Reviews: reviews });
});

// POST /Signup
const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid Email"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Username is required"),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  handleValidationErrors,
];
router.post("/signup", validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, password, username } = req.body;
  const emailCheck = await User.findOne({ where: { email: email } });
  if (emailCheck) {
    const err = new Error("User already exists");

    err.status = 403;
    err.errors = { email: "User with that email already exists" };
    return next(err);
  }

  const userNameCheck = await User.findOne({ where: { username: username } });
  if (userNameCheck) {
    const err = new Error("User already exists");

    err.status = 403;
    err.errors = { username: "User with that username already exists" };
    return next(err);
  }
  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  // await setTokenCookie(res, user);

  user.dataValues.token = await setTokenCookie(res, user);
  return res.json(user);
});

//GET /user/spots Get all Spots owned by the Current User
router.get(
  "/user/spots",
  [restoreUser, requireAuth],
  async (req, res, next) => {
    const userId = req.user.id;
    const userSpots = await Spot.findAll({
      where: { ownerId: userId },
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
      include: {
        model: Review,
        attributes: [],
      },
    });
    res.json({ Spots: userSpots });
  }
);

//GET /user get current user

router.get("/user", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json(user.dataValues);
  } else return res.json({});
});

// POST /login
const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];
router.post("/login", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    err.title = "Login failed";
    // err.errors = ["The provided credentials were invalid."];
    return next(err);
  }

  user.dataValues.token = await setTokenCookie(res, user);

  return res.json(user);
});

module.exports = router;
