import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Reviews from "../components/Reviews";
import MapComponent from "../components/maps/MapComponent";
import "../components/styling//TrailDetails.css";
import "../components/styling/Hero.css";

import "../components/styling/About.css";
import Marquee from "../components/Marquee.jsx";

const TrailDetails = ({ user: initialUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trail, setTrail] = useState(null);
  const [user, setUser] = useState(initialUser);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!user) {
      fetch("https://trails-backend.onrender.com/current-user", {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user || null))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [user]);

  useEffect(() => {
    fetch(`https://trails-backend.onrender.com/trailgrounds/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTrail(data))
      .catch((err) => console.error("Error fetching trail:", err));
  }, [id]);

  if (!trail) return <p>Loading trail details...</p>;

  const handleDeleteTrail = async () => {
    if (!window.confirm("Are you sure you want to delete this trail?")) return;

    try {
      const response = await fetch(
        `https://trails-backend.onrender.com/trailgrounds/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        alert("Failed to delete trail.");
        return;
      }

      alert("Trail deleted successfully!");
      navigate("/trailgrounds");
    } catch (error) {
      console.error("Error deleting trail:", error);
      alert("An error occurred while deleting the trail.");
    }
  };

  return (
    <>
      <div className="trail-wrapper">
        <h2 className="trail-title2">{trail.title}</h2>
        <p className="trail-location2">{trail.location}</p>

        {/* <div className="btn-container">
          <Link to="/trailgrounds" className="btn-back">
            Back to Trails
          </Link>
        </div> */}
        <div className="trail-main">
          <div className="trail-left">
            {/* Trail image carousel */}
            {trail.images?.length > 0 && (
              <div className="trail-carousel">
                <img
                  src={trail.images[currentImage].url}
                  alt={trail.title}
                  className="carousel-image"
                />
                {trail.images.length > 1 && (
                  <>
                    <button
                      className="carousel-btn left"
                      onClick={() =>
                        setCurrentImage((prev) =>
                          prev === 0 ? trail.images.length - 1 : prev - 1
                        )
                      }
                    >
                      ‹
                    </button>
                    <button
                      className="carousel-btn right"
                      onClick={() =>
                        setCurrentImage((prev) =>
                          prev === trail.images.length - 1 ? 0 : prev + 1
                        )
                      }
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Map */}
            {trail.geometry && (
              <div className="trail-map">
                <MapComponent
                  coordinates={trail.geometry.coordinates}
                  location={trail.location}
                />
              </div>
            )}
          </div>

          <div className="divider" />

          <div className="trail-right">
            <h2 className="trail-title1">{trail.title}</h2>
            <p className="trail-location1">{trail.location}</p>
            <p className="trail-description1">{trail.description}</p>

            <p>
              <strong>Entry fee:</strong> ${trail.price}
            </p>
            <p>
              <strong>Difficulty:</strong> {trail.difficulty || "Not specified"}
            </p>
            {/* <p>
            <strong>Best season:</strong> Winter, Summer
          </p> */}
            <p>
              <strong>Trail type:</strong> {trail.trailType || "Unknown"}
            </p>
            <p>
              <strong>Trail variation:</strong>{" "}
              {trail.trailVariation || "Not specified"}
            </p>
            <p>
              <strong>Distance:</strong> {trail.distance} km
            </p>
            <p>
              <strong>Elevation Gain:</strong> {trail.elevationGain} m
            </p>

            {user &&
              trail.author &&
              (user.isAdmin ||
                String(user._id) === String(trail.author._id)) && (
                <div className="trail-buttons">
                  <Link className="btn-edit" to={`/trailgrounds/${id}/edit`}>
                    EDIT TRAIL
                  </Link>
                  <button className="btn-delete" onClick={handleDeleteTrail}>
                    DELETE TRAIL
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
      <Marquee />
      <div className="trail-wrapper1">
        <div className="reviews-section">
          {/* <h3>Reviews</h3> */}
          <Reviews user={user} reviews={trail.reviews} trailId={id} />
        </div>
      </div>
    </>
  );
};

export default TrailDetails;
