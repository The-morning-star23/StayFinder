import React, { useState, useRef, useEffect } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState({ adults: 1, children: 0 });
  const [activeIndex, setActiveIndex] = useState(null);
  const [showGuests, setShowGuests] = useState(false);
  const containerRef = useRef(null);
  const checkoutRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveIndex(null);
        setShowGuests(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, checkin, checkout, guests });
  };

  const handleFocus = (index) => {
    setActiveIndex(index);
    if (index === 1) {
      setTimeout(() => checkoutRef.current?.focus(), 500);
    }
    if (index === 3) {
      setShowGuests((prev) => !prev);
    } else {
      setShowGuests(false);
    }
  };

  return (
    <form
      ref={containerRef}
      onSubmit={handleSubmit}
      className={`search-bar-container four`}
    >
      {activeIndex !== null && (
        <div
          className="search-highlight"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
      )}

      <div
        className={`search-section ${activeIndex === 0 ? "active" : ""}`}
        onClick={() => handleFocus(0)}
      >
        <input
          type="text"
          placeholder="Enter location or property"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div
        className={`search-section ${activeIndex === 1 ? "active" : ""}`}
        onClick={() => handleFocus(1)}
      >
        <input
          type="date"
          placeholder="Check-in"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
        />
      </div>

      <div
        className={`search-section ${activeIndex === 2 ? "active" : ""}`}
        onClick={() => handleFocus(2)}
      >
        <input
          type="date"
          placeholder="Check-out"
          ref={checkoutRef}
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
        />
      </div>

      <div
        className={`search-section ${activeIndex === 3 ? "active" : ""}`}
        onClick={() => handleFocus(3)}
      >
        <div className="guest-toggle">
          {guests.adults + guests.children} guest(s)
        </div>
        {showGuests && (
          <div className="guest-dropdown">
            <div className="guest-row">
              <span>Adults</span>
              <div className="guest-controls">
                <button
                  type="button"
                  onClick={() =>
                    setGuests((g) => ({
                      ...g,
                      adults: Math.max(1, g.adults - 1),
                    }))
                  }
                >
                  -
                </button>
                <span>{guests.adults}</span>
                <button
                  type="button"
                  onClick={() =>
                    setGuests((g) => ({ ...g, adults: g.adults + 1 }))
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div className="guest-row">
              <span>Children</span>
              <div className="guest-controls">
                <button
                  type="button"
                  onClick={() =>
                    setGuests((g) => ({
                      ...g,
                      children: Math.max(0, g.children - 1),
                    }))
                  }
                >
                  -
                </button>
                <span>{guests.children}</span>
                <button
                  type="button"
                  onClick={() =>
                    setGuests((g) => ({ ...g, children: g.children + 1 }))
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
