import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">StayFinder</Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/home">Browse Stays</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/login" className="login-btn">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
