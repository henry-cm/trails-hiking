import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styling/NewTrail.css";
import Marquee from "../components/Marquee";
import "../components/styling/Marquee.css";
import bannerImage from "../assets/trail_03.avif";
import Banner from "../components/Banner";

const NewTrail = () => {
  const navigate = useNavigate();

  // ✅ Form fields with default empty values
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [trailVariation, setTrailVariation] = useState("");
  const [trailType, setTrailType] = useState("");
  const [images, setImages] = useState([]);
  const [elevationGain, setElevationGain] = useState("");
  const [distance, setDistance] = useState("");

  // ✅ Handle file input for images
  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  // ✅ Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !difficulty ||
      !trailType ||
      !trailVariation
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const coordinatesProvided = latitude.trim() && longitude.trim();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("latitude", coordinatesProvided ? latitude : "");
    formData.append("longitude", coordinatesProvided ? longitude : "");
    formData.append("price", price || "0");
    formData.append("description", description);
    formData.append("difficulty", difficulty);
    formData.append("trailType", trailType);
    formData.append("trailVariation", trailVariation);
    formData.append("elevationGain", elevationGain || "0");
    formData.append("distance", distance || "0");

    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append("image", images[i]);
      }
    }

    try {
      const response = await fetch(
        "https://trails-backend.onrender.com/trailgrounds",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Failed to add trail.");
        return;
      }

      alert("Trail added successfully!");
      navigate("/trailgrounds");
    } catch (error) {
      console.error("Error submitting trail:", error);
      alert("An error occurred while adding the trail.");
    }
    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  return (
    <div className="addtrail-container">
      <Banner image={bannerImage} title="ADD TRAIL" altText="ADD Banner" />
      <Marquee />
      {/* Form */}
      <div className="addtrail-wrapper">
        <div className="addtrail-form">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-row">
              {/* Left Column */}
              <div className="form-col">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <label>Location (City, Province)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Example: Banff, Alberta"
                  required
                />

                <label>Latitude</label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="51.417076"
                  required
                />

                <label>Longitude</label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="-116.227718"
                  required
                />

                <label>Entry Fee ($)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <label>Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  required
                >
                  <option value="">Select Difficulty</option>
                  <option value="Very Easy">Very Easy</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Hard">Hard</option>
                  <option value="Very Hard">Very Hard</option>
                </select>
              </div>

              {/* Right Column */}
              <div className="form-col">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>

                <label>Trail Type</label>
                <select
                  value={trailType}
                  onChange={(e) => setTrailType(e.target.value)}
                  required
                >
                  <option value="">Select Trail Type</option>
                  <option value="Loop">Loop</option>
                  <option value="Out & Back">Out & Back</option>
                  <option value="Point-to-Point">Point-to-Point</option>
                </select>

                <label>Trail Variation</label>
                <select
                  value={trailVariation}
                  onChange={(e) => setTrailVariation(e.target.value)}
                  required
                >
                  <option value="">Select Trail Variation</option>
                  <option value="Hiking">Hiking</option>
                  <option value="Biking">Biking</option>
                  <option value="Cross-Country Skiing">
                    Cross-Country Skiing
                  </option>
                  <option value="Snowshoeing">Snowshoeing</option>
                  <option value="Running">Running</option>
                </select>

                <label>Hike Distance (km)</label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />

                <label>Elevation Gain (meters)</label>
                <input
                  type="number"
                  value={elevationGain}
                  onChange={(e) => setElevationGain(e.target.value)}
                />

                <label>Images</label>
                <input type="file" multiple onChange={handleFileChange} />
              </div>
            </div>

            <button className="addtrail-submit" type="submit">
              ADD TRAIL
            </button>

            <div className="back-link">
              <a href="/trailgrounds">Back to Trails</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTrail;
