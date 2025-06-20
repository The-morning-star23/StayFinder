import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const location = useLocation();

  const handleContactClick = () => {
    if (location.pathname === "/contact") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} StayFinder. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact" onClick={handleContactClick}>Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
