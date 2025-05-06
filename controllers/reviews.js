const Trailground = require("../models/trailground");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  try {
    const { id } = req.params; // trail ID
    const trailground = await Trailground.findById(id);

    const review = new Review(req.body.review);
    review.author = req.user._id;

    trailground.reviews.push(review);

    await review.save();
    await trailground.save();

    // Instead of res.redirect, return the new review as JSON
    // so the frontend can add it to state
    res.status(201).json(review);
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ error: "Server error creating review" });
  }
};

module.exports.destroyReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // ✅ Allow admins to bypass author check
    if (!review.author.equals(req.user._id) && !req.user.isAdmin) {
      return res.status(403).json({
        error: "You do not have permission to delete this review.",
      });
    }

    await Trailground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Server error deleting review" });
  }
};
