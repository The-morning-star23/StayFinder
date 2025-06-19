import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import "./Home.css";

function Home() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({ location: "", minPrice: "", maxPrice: "" });

  const fetchListings = async () => {
    const params = new URLSearchParams();
    if (filters.location) params.append("location", filters.location);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

    try {
      const res = await axiosInstance.get(`/listings?${params.toString()}`);
      setListings(res.data);
    } catch (error) {
      console.error("Error fetching listings:", error.message);
    }
  };

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchListings();
  };

  return (
    <div className="home-container">
      <form className="filter-form" onSubmit={handleSearch}>
        <input type="text" name="location" placeholder="Location" value={filters.location} onChange={handleChange} />
        <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleChange} />
        <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      <div className="listing-grid">
        {listings.map(listing => (
          <div key={listing._id} className="listing-card">
            <img src={listing.images[0]} alt={listing.title} />
            <h3>{listing.title}</h3>
            <p>{listing.location}</p>
            <p>₹{listing.price} / night</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
