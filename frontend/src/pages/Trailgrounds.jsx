import { useEffect, useState } from "react";
import ClusterMap from "../components/maps/ClusterMap";
import TrailList from "../components/TrailList";
import "../components/styling/Trailgrounds.css";
import Marquee from "../components/Marquee.jsx";
import Banner from "../components/Banner";
import bannerImage from "../assets/trail_02.avif";

const Trailgrounds = () => {
  const [trailgrounds, setTrailgrounds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/trailgrounds", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTrailgrounds(data))
      .catch((error) => console.error("Error fetching trails:", error));
  }, []);

  const filteredTrails = trailgrounds.filter(
    (trail) =>
      trail.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trail.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Banner image={bannerImage} title="FIND TRAIL" altText="About Banner" />
      <div className="trailgrounds-map">
        <ClusterMap trailgrounds={trailgrounds} />
      </div>

      <Marquee />

      <div className="trailgrounds-page">
        <div className="search-container">
          {/* <h1 className="find-trail">Find your Trail</h1> */}
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="trail-search"
          />
        </div>

        <div className="trailgrounds-list">
          {trailgrounds.length > 0 ? (
            <TrailList trailgrounds={filteredTrails} />
          ) : (
            <p>Loading trails...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Trailgrounds;
