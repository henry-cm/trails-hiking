const express = require("express");
const router = express.Router();
const trailgrounds = require("../controllers/trailgrounds");

const catchAsync = require("../util/catchAsync");
const { isLoggedIn, isAuthor, validateTrail } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const Trailground = require("../models/trailground");

// GET all trails (JSON response for frontend)
router.get("/", async (req, res) => {
  try {
    const trails = await Trailground.find({});
    res.json(trails);
  } catch (err) {
    console.error("Error fetching trails:", err);
    res.status(500).json({ error: "Server error fetching trails" });
  }
});
router.get("/", (req, res) => {
  res.json({
    title: "About Trails-Hiking",
    description:
      "Trails-Hiking is a community-driven platform where hikers can explore, log, and share trails with real reviews and insights.",
    mission:
      "Our mission is to empower outdoor enthusiasts by providing a comprehensive and engaging platform to explore nature, share experiences, and inspire others to hit the trails.",
  });
});

// POST route to create a new trail (React form submits here)
router.post(
  "/",
  isLoggedIn,
  upload.array("image"),
  catchAsync(trailgrounds.createTrailground)
);

// GET a single trail (includes reviews & author)
router.route("/:id").get(catchAsync(trailgrounds.showTrailground));
router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  upload.array("image"),
  catchAsync(trailgrounds.updateTrailground)
);

router.delete(
  "/:id",
  isLoggedIn,
  (req, res, next) => {
    if (req.user.isAdmin) return next();
    isAuthor(req, res, next);
  },
  catchAsync(trailgrounds.destroyTrailground)
);

// GET edit form (React won't use this, but keeping it)
router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(trailgrounds.renderEditForm)
);

module.exports = router;
