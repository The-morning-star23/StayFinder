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

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        StayFinder
      </div>
      <nav className="nav-links">
        <span onClick={handleLogoClick} style={{ cursor: "pointer" }}>Home</span>
        <Link to="/contact">Contact Us</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}

export default Header;
