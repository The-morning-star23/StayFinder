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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(form);
  };

  return (
    <form className="search-bar-advanced" onSubmit={handleSubmit}>
      <input
        type="text"
        name="location"
        placeholder="Location or Property Name"
        value={form.location}
        onChange={handleChange}
      />
      <input
        type="date"
        name="checkIn"
        value={form.checkIn}
        onChange={handleChange}
      />
      <input
        type="date"
        name="checkOut"
        value={form.checkOut}
        onChange={handleChange}
      />
      <div className="guest-select">
        <label>
          Adults
          <input
            type="number"
            name="adults"
            min="1"
            max="10"
            value={form.adults}
            onChange={handleChange}
          />
        </label>
        <label>
          Children
          <input
            type="number"
            name="children"
            min="0"
            max="10"
            value={form.children}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
