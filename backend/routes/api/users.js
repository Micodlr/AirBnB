const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

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

const router = express.Router();

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  await setTokenCookie(res, user);

  return res.json({
    user,
  });
});

module.exports = router;