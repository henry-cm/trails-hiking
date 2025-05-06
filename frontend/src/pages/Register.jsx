import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styling//Auth.css"; // new file
import bannerImage from "../assets/trail_03.avif";
import Banner from "../components/Banner";

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const strongPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    return strongPattern.test(password);
  };

  const validateEmail = (email) => {
    const basicPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return basicPattern.test(email) && email.endsWith(".com");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 6 characters and include a letter, number, and symbol."
      );
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Email must be valid and end with .com");
      return;
    }

    setError("");

    try {
      const response = await fetch(
        "https://trails-backend.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Registration failed");
        return;
      }

      const returnTo = new URLSearchParams(window.location.search).get(
        "returnTo"
      );
      setUser(data.user);
      navigate(returnTo || "/");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="auth-container">
      <Banner image={bannerImage} title="REGISTER" altText="REGISTER Banner" />
      <div className="auth-flex">
        {/* Left side - Why Register */}
        <div className="auth-info">
          <h2>Why Register?</h2>
          <p>
            Registering gives you access to the full experience — leave reviews,
            upload photos, and help fellow explorers find the best spots.
          </p>
          <p>
            Everyone sees the trails, but only a few share what they felt. With
            an account, you can log your favorite routes and help others along
            the way.
          </p>
          <p>
            Registered users can bookmark trails, track their contributions, and
            return to the hikes they love without searching again.
          </p>
          <p>
            Signing up is quick, free, and respectful of your space. No spam —
            just your trail journey, unlocked.
          </p>
        </div>

        {/* Divider */}
        <div className="auth-divider" />

        {/* Right side - Form */}
        <div className="auth-form-wrapper">
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              required
            />

            <label>E-mail</label>
            <input type="email" name="email" onChange={handleChange} required />

            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              required
            />

            <button type="submit">REGISTER</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
