import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styling/Auth.css";
import bannerImage from "../assets/trail_04.avif";
import Banner from "../components/Banner";
import FlashMessage from "../components/FlashMessage";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [flashMessage, setFlashMessage] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearMessage = () => {
    setFlashMessage({ message: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setFlashMessage({
          message: data.error || "Login failed",
          type: "danger",
        });
        return;
      }

      setUser(data.user);
      setFlashMessage({ message: "Login successful!", type: "success" });

      setTimeout(() => {
        navigate("/trailgrounds");
        window.location.reload();
      }, 500);
    } catch (err) {
      console.error("Login error:", err);
      setFlashMessage({
        message: "Something went wrong. Please try again.",
        type: "danger",
      });
    }
  };

  return (
    <div className="auth-container">
      <Banner image={bannerImage} title="LOGIN" altText="LOGIN Banner" />
      <div className="auth-flex">
        {/* Left side - Why Login */}
        <div className="auth-info">
          <h2>Why Log In?</h2>
          <p>
            Logging in unlocks your saved trails, reviews, and uploaded content.
            It’s your own little corner of the map — always ready when you are.
          </p>
          <p>
            Want to edit a review? Upload more images? Finish a trail post you
            started? Logging in lets you manage it all, seamlessly.
          </p>
          <p>
            See how many people liked your photos, or how many found your review
            helpful. You’re part of a growing community.
          </p>
          <p>
            Logging in ensures that your content stays yours. Private, safe, and
            connected to your account only.
          </p>
        </div>

        {/* Divider */}
        <div className="auth-divider" />

        {/* Right side - Form */}
        {/* Right side - Form */}
        <div className="auth-form-wrapper">
          {/* Flash message above form */}
          {flashMessage.message && (
            <FlashMessage
              message={flashMessage.message}
              type={flashMessage.type}
              clearMessage={clearMessage}
            />
          )}

          <form onSubmit={handleSubmit}>
            <label>Username/E-mail</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />

            <button type="submit">LOGIN</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
