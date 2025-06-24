import React, { useEffect, useState, useCallback, useRef } from "react";
import axiosInstance from "../axios";
import { useLocation } from "react-router-dom";
import "./Home.css";

function Homes() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({ location: "", minPrice: "", maxPrice: "" });
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const locationHook = useLocation();
  const searchQuery = new URLSearchParams(locationHook.search).get("search");
  const fallbackImage = "/images/placeholder.jpg";
  const LIMIT = 12;

  const observer = useRef();
  const lastListingRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchListings();
        }
      });
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, hasMore]
  );

  const fetchListings = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const params = new URLSearchParams();
    params.append("limit", LIMIT);
    params.append("skip", skip);
    if (searchQuery) params.append("location", searchQuery);
    else if (filters.location) params.append("location", filters.location);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

    try {
      const res = await axiosInstance.get(`/listings?${params.toString()}`);
      const newListings = res.data.listings;

      setListings((prev) => [
        ...prev,
        ...newListings.filter((l) => !prev.some((p) => p._id === l._id)),
      ]);
      setSkip((prev) => prev + LIMIT);
      if (newListings.length < LIMIT) setHasMore(false);
    } catch (err) {
      console.error("Error fetching listings:", err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, searchQuery, skip, hasMore, loading]);

  useEffect(() => {
    setListings([]);
    setSkip(0);
    setHasMore(true);
  }, [searchQuery]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setListings([]);
    setSkip(0);
    setHasMore(true);
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
        {listings.length > 0 ? (
          listings.map((listing, i) => (
            <div
              key={listing._id}
              className="listing-card"
              ref={i === listings.length - 1 ? lastListingRef : null}
            >
              <img
                src={listing.images[0]}
                alt={listing.title}
                loading="eager"
                fetchpriority="high"
                onError={(e) => (e.target.src = fallbackImage)}
                style={{ width: "100%", height: "192px", objectFit: "cover", backgroundColor: "#e2e8f0" }}
              />

              <h3>{listing.title}</h3>
              <p>{listing.location}</p>
              <p>₹{listing.price} / night</p>
            </div>
          ))
        ) : (
          !loading && <p>No listings found.</p>
        )}

        {loading &&
          Array(6)
            .fill(0)
            .map((_, i) => (
              <div className="listing-card skeleton-card" key={i}>
                <div className="skeleton-img"></div>
                <div className="skeleton-line short"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Homes;
