// App.jsx
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FlashMessage from "./components/FlashMessage";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Trailgrounds from "./pages/Trailgrounds";
import TrailDetails from "./pages/TrailDetails";
import EditTrail from "./pages/EditTrails";
import NewTrail from "./pages/NewTrail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Updates from "./pages/Updates";

import gsap from "gsap";

function App() {
  const [user, setUser] = useState(undefined);
  const [flashMessage, setFlashMessage] = useState({ message: "", type: "" });

  const location = useLocation();
  const pageRef = useRef(null);

  const showFlash = (message, type = "success") => {
    setFlashMessage({ message, type });
  };

  const clearFlash = () => {
    setFlashMessage({ message: "", type: "" });
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/current-user`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user || null))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  // Animate on route change
  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [location.pathname]);

  return (
    <>
      <Navbar user={user} setUser={setUser} />

      {flashMessage.message && (
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          clearFlash={clearFlash}
        />
      )}

      <div ref={pageRef} key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/trailgrounds" element={<Trailgrounds />} />
          <Route
            path="/trailgrounds/:id"
            element={<TrailDetails user={user} />}
          />
          <Route
            path="/trailgrounds/:id/edit"
            element={
              user === undefined ? (
                <p>Loading...</p>
              ) : user ? (
                <EditTrail user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/new"
            element={
              user ? (
                <NewTrail />
              ) : (
                <Navigate to="/login" state={{ from: "/new" }} replace />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setUser={setUser} showFlash={showFlash} />}
          />
          <Route
            path="/register"
            element={<Register setUser={setUser} showFlash={showFlash} />}
          />
          <Route path="/updates" element={<Updates />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
