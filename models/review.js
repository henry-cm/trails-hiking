const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Review", reviewSchema);

// const { trailgroundSchema, reviewSchema } = require("./schemas.js");
// const ExpressError = require("./util/ExpressError.js");
// const Trailground = require("./models/trailground");
// const Review = require("./models/review");

// module.exports.storeReturnTo = (req, res, next) => {
//   if (req.session.returnTo) {
//     res.locals.returnTo = req.session;
//   }
// };

// module.exports.validateTrail = (req, res, next) => {
//   const { error } = trailgroundSchema.validate(req.body);
//   if (error) {
//     const msg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(msg, 400);
//   } else {
//     next();
//   }
// };

// module.exports.isLoggedIn = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     req.session.returnTo = req.originalUrl;
//     req.flash("error", "sign in required!");
//     return res.redirect("/login");
//   }
//   next();
// };

// module.exports.isAuthor = async (req, res, next) => {
//   const { id } = req.params;
//   const trailground = await Trailground.findById(id);
//   if (!trailground.author.equals(req.user.id)) {
//     req.flash("error", "persmission not granted");
//     return res.redirect(`/trailgrounds/${id}`);
//   }
//   next();
// };

// module.exports.isReviewAuthor = async (req, res, next) => {
//   const { id } = req.params;
//   const trailground = await Trailground.findById(id);
//   if (!trailground.author.equals(req.user.id)) {
//     req.flash("error", "persmission not granted");
//     return res.redirect(`/trailgrounds/${id}`);
//   }
//   next();
// };

// // can add review schema
// module.exports.validateReview = (req, res, next) => {
//   const { error } = reviewSchema.validate(req.body);
//   if (error) {
//     const msg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(msg, 400);
//   } else {
//     next();
//   }
// };
