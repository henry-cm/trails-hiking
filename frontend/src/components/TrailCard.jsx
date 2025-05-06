import React from "react";
import { Link } from "react-router-dom";
import "./styling/TrailCard.css";

const TrailCard = ({ trail }) => {
  return (
    <div className="trail-card">
      {trail.images?.[0]?.url && (
        <img
          src={trail.images[0].url}
          alt={trail.title}
          className="trail-image"
        />
      )}
      <div className="trail-info">
        <h2 className="trail-title">{trail.title}</h2>
        <p className="trail-location">{trail.location}</p>
        <p className="trail-description">
          {trail.description.length > 180
            ? trail.description.slice(0, 180) + "..."
            : trail.description}
        </p>
        <Link to={`/trailgrounds/${trail._id}`} className="view-button">
          VIEW TRAIL
        </Link>
      </div>
    </div>
  );
};

export default TrailCard;
