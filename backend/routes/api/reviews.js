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

router.get("/", async (req, res, next) => {
  res.json("test");
});

module.exports = router;