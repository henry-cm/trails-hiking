import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styling/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [mobileNavVisible, setMobileNavVisible] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/current-user`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user || null);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    closeMobileMenu();
    setTimeout(() => {
      window.location.reload();
    }, 20);
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    // For mobile devices (narrow screens), detect scroll direction
    if (window.innerWidth < 769) {
      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        // Scrolling down: hide mobile navbar
        setMobileNavVisible(false);
      } else if (currentScrollY < prevScrollY) {
        // Scrolling up: show mobile navbar
        setMobileNavVisible(true);
      }
      setPrevScrollY(currentScrollY);
    } else {
      // Desktop: use the existing behavior
      setIsScrolled(currentScrollY > 100);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "auto";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  const handleNavClick = (path) => {
    if (window.location.pathname === path) {
      window.location.reload(); // Force refresh if already on this path
    }
  };

  return (
    <nav
      className={`navbar ${isScrolled ? "scrolled" : ""} ${
        !mobileNavVisible ? "mobile-hidden" : ""
      }`}
    >
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        ☰
      </button>

      {isMobileMenuOpen && (
        <button className="mobile-menu-close" onClick={closeMobileMenu}>
          ✕
        </button>
      )}

      {/* Mobile Menu Wrapper */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="nav-links">
            <Link to="/" onClick={closeMobileMenu}>
              Home
            </Link>
            {user && (
              <Link to="/new" onClick={closeMobileMenu}>
                Add Trail
              </Link>
            )}
            <Link to="/trailgrounds" onClick={closeMobileMenu}>
              View Trails
            </Link>
            <Link to="/about" onClick={closeMobileMenu}>
              About
            </Link>
          </div>

          <div className="auth-links">
            {user ? (
              <button className="logout-btn" onClick={handleLogout}>
                SIGN OUT
              </button>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu}>
                  Login
                </Link>
                <Link to="/register" onClick={closeMobileMenu}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Desktop Nav Links */}
      <div className="nav-links desktop">
        <Link to="/">Home</Link>
        {user && <Link to="/new">Add Trail</Link>}
        <Link to="/trailgrounds">TRAILGROUNDS</Link>
        <Link to="/about">About</Link>
      </div>

      <div className="auth-links desktop">
        {user ? (
          <button className="logout-btn" onClick={handleLogout}>
            SIGN OUT
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
