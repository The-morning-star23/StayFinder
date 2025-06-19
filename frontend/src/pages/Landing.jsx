import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Landing() {
  return (
    <>
      <Header />
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
            <img src="/images/about.jpg" alt="About StayFinder" className="about-img" />
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
              <img src="/images/stay1.jpg" alt="Cozy Hilltop Studio" />
              <div>
                <h4>Cozy Hilltop Studio</h4>
                <p>Goa · ₹1,500/night</p>
              </div>
            </div>
            <div className="stay-card">
              <img src="/images/stay2.jpg" alt="Beachside Apartment" />
              <div>
                <h4>Beachside Apartment</h4>
                <p>Pondicherry · ₹2,200/night</p>
              </div>
            </div>
            <div className="stay-card">
              <img src="/images/stay3.jpg" alt="Jungle Treehouse" />
              <div>
                <h4>Jungle Treehouse</h4>
                <p>Rishikesh · ₹1,800/night</p>
              </div>
            </div>
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
      <Footer />
    </>
  );
}

export default Landing;
