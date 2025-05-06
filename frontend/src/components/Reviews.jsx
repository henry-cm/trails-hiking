import React, { useState, useEffect, useRef } from "react";
import "./styling/Reviews.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reviews({ user, reviews = [], trailId }) {
  const [localReviews, setLocalReviews] = useState(reviews);
  const [newReview, setNewReview] = useState({ rating: 0, body: "" });

  const reviewGridRef = useRef(null);

  useEffect(() => {
    const cards = reviewGridRef.current?.querySelectorAll(".review-card");

    if (!cards) return;

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, [localReviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newReview.body.trim()) {
      alert("Review body is required.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/trailgrounds/${trailId}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ review: newReview }),
        }
      );

      if (!response.ok) {
        alert("Could not create review");
        return;
      }

      const createdReview = await response.json();
      setLocalReviews([...localReviews, createdReview]);
      setNewReview({ rating: 0, body: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred while submitting the review.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/trailgrounds/${trailId}/reviews/${reviewId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        alert("Failed to delete review.");
        return;
      }

      setLocalReviews((prev) =>
        prev.filter((review) => review._id !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("An error occurred while deleting the review.");
    }
  };

  return (
    <div className="reviews-wrapper">
      {!user && (
        <p className="login-note">
          NOTE: to add a review you must be logged in
        </p>
      )}

      <h2>Review Section</h2>

      {user && (
        <form onSubmit={handleSubmit} className="review-form">
          <label>
            Rating (1-5):
            <select
              className="select-rating"
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: e.target.value })
              }
              required
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>

          <label>
            Review Body:
            <textarea
              placeholder="add text in here"
              value={newReview.body}
              onChange={(e) =>
                setNewReview({ ...newReview, body: e.target.value })
              }
              required
            />
          </label>

          <button type="submit">Submit Review</button>
        </form>
      )}

      <div className="review-grid" ref={reviewGridRef}>
        {localReviews.map((rev) => (
          <div className="review-card" key={rev._id}>
            <strong>By {rev.author?.username || "Unknown"}</strong>
            <p>{rev.body}</p>
            <p className="rating">Rating: {rev.rating}</p>

            {user && (user.isAdmin || user._id === rev.author?._id) && (
              <button
                className="delete-button"
                onClick={() => handleDeleteReview(rev._id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
