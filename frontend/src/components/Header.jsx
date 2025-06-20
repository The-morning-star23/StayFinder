import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username) setUsername(user.username);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUsername(null);
    navigate("/login");
  };

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick}>StayFinder</div>
      <div className="center-nav">
        <Link to="/home" className="browse-button">Browse Stays</Link>
      </div>

      <nav className="nav-links">
        <span onClick={handleLogoClick}>Home</span>
        <Link to="/contact">Contact Us</Link>

        {!username ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <div className="user-dropdown" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
            <span className="username">{username}</span>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/account">Account Settings</Link>
                <span onClick={handleLogout}>Logout</span>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
