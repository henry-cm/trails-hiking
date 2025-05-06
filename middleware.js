const { trailgroundSchema, reviewSchema } = require("./schemas.js");
const ExpressError = require("./util/ExpressError.js");
const Trailground = require("./models/trailground");
const Review = require("./models/review");

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session;
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  console.log("Session User:", req.user); // ✅ Debugging log
  console.log("User is Admin?", req.user?.isAdmin); // ✅ Check admin status

  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "You must be logged in." });
  }
  next();
};

module.exports.validateTrail = (req, res, next) => {
  // If trailground is a string, parse it
  if (typeof req.body.trailground === "string") {
    try {
      req.body.trailground = JSON.parse(req.body.trailground);
    } catch (e) {
      return next(new ExpressError("Invalid trailground data", 400));
    }
  }
  const { error } = trailgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
module.exports.isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const trailground = await Trailground.findById(id);

  if (!trailground) {
    return res.status(404).json({ error: "Trail not found" });
  }

  if (req.user && req.user.isAdmin) {
    console.log("Admin bypassing author check");
    return next();
  }

  // ✅ Otherwise, check if the user is the author
  if (!trailground.author.equals(req.user._id)) {
    return res.status(403).json({ error: "Permission denied" });
  }

  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    return res.status(404).json({ error: "Review not found" });
  }

  if (req.user && req.user.isAdmin) {
    console.log("Admin bypassing review author check");
    return next();
  }

  // ✅ Otherwise, check if the user is the review author
  if (!review.author.equals(req.user._id)) {
    return res.status(403).json({ error: "Permission denied" });
  }

  next();
};

// can add review schema
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
