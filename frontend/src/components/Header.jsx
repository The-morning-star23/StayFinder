import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import SearchBar from "./SearchBar";

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

  const handleSearch = (formData) => {
    navigate(`/homes?search=${formData.location}`);
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick}>
        StayFinder
      </div>

      <div className="search-bar-wrapper">
        <SearchBar onSearch={handleSearch} />
      </div>

      <nav className="nav-links">
        <span onClick={handleLogoClick}>Home</span>
        <Link to="/contact">Contact Us</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}

export default Header;
