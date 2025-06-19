// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to StayFinder</h1>
      <p className="landing-subtitle">Book the perfect stay anytime, anywhere.</p>
      <div className="landing-buttons">
        <Link to="/home" className="btn-primary">Browse Listings</Link>
        <Link to="/login" className="btn-outline">Login</Link>
        <Link to="/register" className="btn-outline">Register</Link>
      </div>
    </div>
  );
}

export default Landing;
