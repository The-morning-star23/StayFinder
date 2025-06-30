import React, { useState, useRef } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState({ adults: 1, children: 0 });
  const [active, setActive] = useState(null);
  const [showGuests, setShowGuests] = useState(false);

  const checkoutRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, checkin, checkout, guests });
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-container">
      <div
        className={`search-section ${active === "location" ? "active" : ""}`}
        onClick={() => setActive("location")}
      >
        <input
          type="text"
          placeholder="Enter location or property"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div
        className={`search-section ${active === "checkin" ? "active" : ""}`}
        onClick={() => {
          setActive("checkin");
          setTimeout(() => checkoutRef.current?.focus(), 500); // auto-move
        }}
      >
        <input
          type="date"
          placeholder="Check-in"
          className="date-input"
          value={checkin}
          onChange={(e) => setCheckin(e.target.value)}
        />
      </div>

      <div
        className={`search-section ${active === "checkout" ? "active" : ""}`}
        onClick={() => setActive("checkout")}
      >
        <input
          type="date"
          placeholder="Check-out"
          className="date-input"
          ref={checkoutRef}
          value={checkout}
          onChange={(e) => setCheckout(e.target.value)}
        />
      </div>

      <div
        className={`search-section ${active === "guests" ? "active" : ""}`}
        onClick={() => {
          setActive("guests");
          setShowGuests(!showGuests);
        }}
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
