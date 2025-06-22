import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
function Landing() {
  return (
      <div>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-overlay">
            <h1 className="hero-title">Find Your Perfect Stay Anywhere</h1>
            <p className="hero-subtitle">
              StayFinder connects travelers with affordable, comfortable, and verified homes worldwide.
            </p>
            <div className="hero-buttons">
              <Link to="/home" className="btn-primary">Browse Listings</Link>
              <Link to="/register" className="btn-secondary">Join the Community</Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about">
          <div className="about-content">
            <div className="about-text">
              <h2>What is StayFinder?</h2>
              <p>
                StayFinder is a trusted platform for digital nomads, remote workers, and travelers seeking safe, verified, and community-driven accommodations. Whether it’s a weekend getaway or a long-term workcation, we have your next home.
              </p>
            </div>
            <img src="/images/about.png" alt="About StayFinder" className="about-img" />
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="features">
          <h2 className="section-title">Why Choose StayFinder?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <img src="/images/trust.png" alt="Trusted Hosts" />
              <h3>Trusted Hosts</h3>
              <p>All listings verified for safety and comfort.</p>
            </div>
            <div className="feature-card">
              <img src="/images/community.png" alt="Community" />
              <h3>Global Community</h3>
              <p>Over 10,000 nomads trust StayFinder.</p>
            </div>
            <div className="feature-card">
              <img src="/images/support.png" alt="Support" />
              <h3>24/7 Support</h3>
              <p>Real humans, ready to help—anytime.</p>
            </div>
          </div>
        </section>

        {/* Featured Stays */}
        <section className="featured">
          <h2 className="section-title">Featured Stays</h2>
          <div className="stay-cards">
            <div className="stay-card">
              <img src="/images/isting/stay1.jpg" alt="Cozy Hilltop Cabin" />
              <div>
                <h4>Cozy Hilltyo Cabin</h4>
                <p>Goa · ₹5000/night</p>
              </div>
            </div>
            <div className="stay-card">
              <img src="/images/listings/stay2.jpg" alt="Beach-view House" />
              <div>
                <h4>Beach-view House</h4>
                <p>Goa · ₹7000/night</p>
              </div>
            </div>
            <div className="stay-card">
              <img src="/images/listings/stay3.jpg" alt="Jungle Treehouse" />
              <div>
                <h4>Jungle Treehouse</h4>
                <p>Shimla · ₹7000/night</p>
              </div>
            </div>
          </div>
          <div className="browse-more-btn-wrapper">
             <Link to="/home" className="btn-primary">Browse More Stays</Link>
          </div>
        </section>

        {/* Join Community */}
        <section className="join">
          <div className="join-overlay">
            <h2>Stay connected. Travel freely.</h2>
            <p>Join thousands of members making the world their home.</p>
            <Link to="/register" className="btn-primary">Get Started</Link>
          </div>
        </section>
      </div>
  );
}

export default Landing;
