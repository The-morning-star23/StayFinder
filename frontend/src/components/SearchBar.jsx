import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [form, setForm] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
  });

  const [guestOpen, setGuestOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuestChange = (type, op) => {
    setForm((prev) => ({
      ...prev,
      [type]: op === "inc" ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(form);
  };

  return (
    <form className="searchbar-container" onSubmit={handleSubmit}>
      <input
        type="text"
        name="location"
        placeholder="Where to? (City, Property)"
        value={form.location}
        onChange={handleChange}
      />

      <input
        type="date"
        name="checkIn"
        placeholder="Check-in"
        value={form.checkIn}
        onChange={handleChange}
      />

      <input
        type="date"
        name="checkOut"
        placeholder="Check-out"
        value={form.checkOut}
        onChange={handleChange}
      />

      <div className="guest-selector">
        <div className="guest-display" onClick={() => setGuestOpen(!guestOpen)}>
          {form.adults + form.children} Guest{form.adults + form.children !== 1 ? "s" : ""}
        </div>
        {guestOpen && (
          <div className="guest-dropdown">
            <div className="guest-row">
              <span>Adults</span>
              <div className="guest-controls">
                <button type="button" onClick={() => handleGuestChange("adults", "dec")}>-</button>
                <span>{form.adults}</span>
                <button type="button" onClick={() => handleGuestChange("adults", "inc")}>+</button>
              </div>
            </div>
            <div className="guest-row">
              <span>Children</span>
              <div className="guest-controls">
                <button type="button" onClick={() => handleGuestChange("children", "dec")}>-</button>
                <span>{form.children}</span>
                <button type="button" onClick={() => handleGuestChange("children", "inc")}>+</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <button type="submit" className="search-btn">Search</button>
    </form>
  );
}

export default SearchBar;
