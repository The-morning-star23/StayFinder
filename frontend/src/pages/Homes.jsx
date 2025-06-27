import React, { useEffect, useState, useCallback, useRef } from "react";
import axiosInstance from "../axios";
import { useLocation } from "react-router-dom";
import "./Homes.css";

function Home() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({ location: "", minPrice: "", maxPrice: "" });
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef(null);
  const LIMIT = 12;
  const locationHook = useLocation();
  const searchQuery = new URLSearchParams(locationHook.search).get("search");
  const fallbackImage = "/images/placeholder.jpg";

  const fetchListings = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("limit", LIMIT);
      params.append("skip", skip);
      if (searchQuery) params.append("location", searchQuery);
      else if (filters.location) params.append("location", filters.location);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

      const res = await axiosInstance.get(`/listings?${params.toString()}`);
      const newListings = res.data.listings;

      setListings((prev) => [...prev, ...newListings]);
      setSkip((prev) => prev + newListings.length);
      if (newListings.length < LIMIT) setHasMore(false);
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, searchQuery, skip, hasMore, loading]);

  useEffect(() => {
    // Reset on new search
    const resetAndFetch = async () => {
      setListings([]);
      setSkip(0);
      setHasMore(true);
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("limit", LIMIT);
        params.append("skip", 0);
        if (searchQuery) params.append("location", searchQuery);
        if (filters.location) params.append("location", filters.location);
        if (filters.minPrice) params.append("minPrice", filters.minPrice);
        if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

        const res = await axiosInstance.get(`/listings?${params.toString()}`);
        const newListings = res.data.listings;
        setListings(newListings);
        setSkip(newListings.length);
        setHasMore(newListings.length === LIMIT);
      } catch (err) {
        console.error("Initial fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    resetAndFetch();
  }, [searchQuery, filters]);

  // Infinite scroll
  const lastListingRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchListings();
          }
        },
        {
          rootMargin: "200px",
        }
      );
      if (node) observer.current.observe(node);
    },
    [fetchListings, loading, hasMore]
  );

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setListings([]);
    setSkip(0);
    setHasMore(true);
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
        {listings.map((listing, i) => (
          <div
            key={listing._id}
            className="listing-card"
            ref={i === listings.length - 1 ? lastListingRef : null}
          >
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

        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div className="listing-card skeleton-card" key={`skeleton-${i}`}>
              <div className="skeleton-img" />
              <div className="skeleton-line short" />
              <div className="skeleton-line" />
              <div className="skeleton-line" />
            </div>
          ))}

        {!loading && listings.length === 0 && (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
