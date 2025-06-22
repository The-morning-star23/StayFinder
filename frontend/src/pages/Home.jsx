import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useLocation } from "react-router-dom";
import "./Home.css";

function Home() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({ location: "", minPrice: "", maxPrice: "" });
  const [loading, setLoading] = useState(true);
  const locationHook = useLocation();
  const searchQuery = new URLSearchParams(locationHook.search).get("search");

  const fetchListings = async () => {
    const params = new URLSearchParams();
    if (searchQuery) {
      params.append("location", searchQuery);
    } else if (filters.location) {
      params.append("location", filters.location);
    }
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

    try {
      setLoading(true);
      const res = await axiosInstance.get(`/listings?${params.toString()}`);
      setListings(res.data);
    } catch (error) {
      console.error("Error fetching listings:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchListings();
  };

  const fallbackImage = "/images/placeholder.jpg";

  return (
    <div className="home-container">
      <form className="filter-form" onSubmit={handleSearch}>
        <input type="text" name="location" placeholder="Location" value={filters.location} onChange={handleChange} />
        <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleChange} />
        <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      <div className="listing-grid">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div className="listing-card skeleton-card" key={i}>
              <div className="skeleton-img"></div>
              <div className="skeleton-line short"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
            </div>
          ))
        ) : listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing._id} className="listing-card">
              <img
                src={listing.images[0]}
                alt={listing.title}
                onError={(e) => (e.target.src = fallbackImage)}
              />
              <h3>{listing.title}</h3>
              <p>{listing.location}</p>
              <p>₹{listing.price} / night</p>
            </div>
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
