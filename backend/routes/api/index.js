const router = require("express").Router();
const spotsRouter = require("./spots.js");
const userRouter = require("./users.js");
const reviewsRouter = require("./reviews");
const bookingsRouter = require("./bookings");
const imagesRouter = require("./images");
const { User } = require("../../db/models");
const { setTokenCookie } = require("../../utils/auth.js");
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

// router.use("/session", sessionRouter);
router.use("/spots", spotsRouter);
router.use("/reviews", reviewsRouter);
router.use("/bookings", bookingsRouter);
router.use("/images", imagesRouter);
router.use("/", userRouter);
router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

// GET /api/restore-user

router.get("/restore-user", (req, res) => {
  return res.json(req.user);
});

// GET /api/require-auth
const { requireAuth } = require("../../utils/auth.js");
router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
