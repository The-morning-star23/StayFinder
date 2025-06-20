import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleContactClick = () => {
    if (location.pathname === "/contact") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        StayFinder
      </div>
      <nav className="nav-links">
        <span
          onClick={handleLogoClick}
          className={location.pathname === "/" ? "active-link" : ""}
        >
          Home
        </span>
        <Link
          to="/contact"
          className={location.pathname === "/contact" ? "active-link" : ""}
          onClick={handleContactClick}
        >
          Contact Us
        </Link>
        <Link
          to="/login"
          className={location.pathname === "/login" ? "active-link" : ""}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={location.pathname === "/register" ? "active-link" : ""}
        >
          Register
        </Link>
      </nav>
    </header>
  );
}

export default Header;
