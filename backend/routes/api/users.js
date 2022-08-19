const express = require("express");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User, Spot, Review } = require("../../db/models");
const sequelize = require("sequelize");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// POST /Signup
const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please proved a last name"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
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
    console.log("hello");
    const userId = req.user.id;
    const userSpots = await Spot.findAll({
      where: { ownerId: userId },
      attributes: {
        include: [
          [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
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
