import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          StayFinder
        </Link>
      </div>
      <nav className="header-nav">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
      </nav>
    </header>
  );
}

export default Header;
