const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviews = require("../controllers/reviews");
const Trailground = require("../models/trailground");
const Review = require("../models/review");

const ExpressError = require("../util/ExpressError");
const catchAsync = require("../util/catchAsync");

// can go into middleware + reviewSchema

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  (req, res, next) => {
    if (req.user.isAdmin) return next(); // ✅ Allow admin to delete any review
    isReviewAuthor(req, res, next); // ✅ Otherwise, check author
  },
  catchAsync(reviews.destroyReview)
);

module.exports = router;
