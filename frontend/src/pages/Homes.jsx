import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { useLocation } from "react-router-dom";
import "./Home.css";

const LIMIT = 9;

function Home() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({ location: "", minPrice: "", maxPrice: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const locationHook = useLocation();
  const searchQuery = new URLSearchParams(locationHook.search).get("search");
  const fallbackImage = "/images/placeholder.jpg";

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("limit", LIMIT);
      params.append("skip", (page - 1) * LIMIT);
      if (searchQuery) params.append("location", searchQuery);
      else if (filters.location) params.append("location", filters.location);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

      const res = await axiosInstance.get(`/listings?${params.toString()}`);
      setListings(res.data.listings);
      setTotalPages(Math.ceil(res.data.total / LIMIT));
    } catch (err) {
      console.error("Error fetching listings:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
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
        {loading
          ? Array(6).fill(0).map((_, i) => (
              <div className="listing-card skeleton-card" key={i}>
                <div className="skeleton-img"></div>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
              </div>
            ))
          : listings.map((listing) => (
              <div className="listing-card" key={listing._id}>
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  loading="lazy"
                  onError={(e) => (e.target.src = fallbackImage)}
                />
                <h3>{listing.title}</h3>
                <p>{listing.location}</p>
                <p>₹{listing.price} / night</p>
              </div>
            ))}
      </div>

      {!loading && listings.length === 0 && <p className="text-center text-gray-500 mt-8">No listings found.</p>}

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`pagination-btn ${page === i + 1 ? "active" : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
