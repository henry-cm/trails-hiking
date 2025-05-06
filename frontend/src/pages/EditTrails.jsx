import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../components/styling/EditTrail.css";

import bannerImage from "../assets/trail_03.avif";
import Banner from "../components/Banner";
import Marquee from "../components/Marquee";

const EditTrail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Default state to prevent uncontrolled input errors
  const [trail, setTrail] = useState(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // New images
  const [existingImages, setExistingImages] = useState([]); // Existing images
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [trailType, setTrailType] = useState("");
  const [trailVariation, setTrailVariation] = useState("");
  const [distance, setDistance] = useState("");
  const [elevationGain, setElevationGain] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://trails-backend.onrender.com/trailgrounds/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTrail(data);
        setTitle(data.title || "");
        setLocation(data.location || "");
        setPrice(data.price || "");
        setDescription(data.description || "");
        setExistingImages(data.images || []);
        setDifficulty(data.difficulty || "");
        setTrailType(data.trailType || "");
        setTrailVariation(data.trailVariation || "");
        setDistance(data.distance || "");
        setElevationGain(data.elevationGain || "");

        if (data.geometry && data.geometry.coordinates.length === 2) {
          setLongitude(data.geometry.coordinates[0]); // Longitude first
          setLatitude(data.geometry.coordinates[1]); // Latitude second
        }

        setLoading(false);
      })
      .catch((err) => console.error("Error fetching trail:", err));
  }, [id]);

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files)); // Convert FileList to array
  };

  // ✅ Handle image deletion
  const handleImageDelete = (filename) => {
    setImagesToDelete((prev) =>
      prev.includes(filename)
        ? prev.filter((img) => img !== filename)
        : [...prev, filename]
    );
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trailgroundData = {
      title,
      location,
      price,
      description,
      difficulty,
      trailType,
      trailVariation,
      distance,
      elevationGain,
    };

    let formData = new FormData();
    formData.append("trailground", JSON.stringify(trailgroundData));

    // ✅ Append new images
    images.forEach((image) => {
      formData.append("image", image);
    });

    // ✅ Append deleted images
    imagesToDelete.forEach((filename) => {
      formData.append("deleteImages[]", filename);
    });

    try {
      const response = await fetch(
        `https://trails-backend.onrender.com/trailgrounds/${id}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating trail:", errorData.error);
        alert(errorData.error || "Failed to update trail");
        return;
      }

      navigate(`/trailgrounds/${id}`);
    } catch (error) {
      console.error("Error submitting update:", error);
      alert("An error occurred while updating the trail.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edittrail-container">
      <Banner image={bannerImage} title="EDIT TRAIL" altText="Edit Banner" />
      <Marquee />
      <div className="edittrail-wrapper">
        <div className="edittrail-form">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="edit-form-row">
              <div className="edit-form-col">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <label>Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />

                <label>Latitude</label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                />

                <label>Longitude</label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                />

                <label>Entry Fee</label>
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

              <div className="edit-form-col">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

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

                <label>Distance (km)</label>
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />

                <label>Elevation Gain (m)</label>
                <input
                  type="number"
                  value={elevationGain}
                  onChange={(e) => setElevationGain(e.target.value)}
                />
              </div>
            </div>

            <label>Upload New Images</label>
            <input type="file" multiple onChange={handleFileChange} />

            <div className="image-preview-section">
              <h4>Existing Images</h4>
              {existingImages.map((img, i) => (
                <div className="image-preview-item" key={i}>
                  <img src={img.url} alt="Existing" />
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleImageDelete(img.filename)}
                    />{" "}
                    Mark for deletion
                  </label>
                </div>
              ))}
            </div>

            <button className="edittrail-submit" type="submit">
              UPDATE TRAIL
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

export default EditTrail;
