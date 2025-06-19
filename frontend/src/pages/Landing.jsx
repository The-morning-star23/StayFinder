import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-wrapper">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to StayFinder</h1>
          <p>Discover and book unique stays around the world.</p>
          <div className="hero-buttons">
            <Link to="/browse" className="btn-primary">Browse Listings</Link>
            <Link to="/register" className="btn-secondary">Join Now</Link>
          </div>
        </div>
        <img
          className="hero-image"
          src="/images/hero-stay.jpg"
          alt="StayFinder Community"
        />
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Why StayFinder?</h2>
        <div className="about-grid">
          <div className="about-card">
            <img src="/images/trust.png" alt="Trust" />
            <h3>Trusted Hosts</h3>
            <p>We verify each listing to ensure safety and reliability.</p>
          </div>
          <div className="about-card">
            <img src="/images/community.png" alt="Community" />
            <h3>Vibrant Community</h3>
            <p>Join thousands of happy travelers and hosts.</p>
          </div>
          <div className="about-card">
            <img src="/images/support.png" alt="Support" />
            <h3>24/7 Support</h3>
            <p>We’ve got your back anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h3>StayFinder</h3>
            <p>Making travel more local, connected, and trusted.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/browse">Browse Listings</Link></li>
              <li><Link to="/register">Become a Host</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} StayFinder. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Landing;
