import React, { useEffect, useState, useRef, useCallback } from "react";
import axiosInstance from "../axios";
import { useLocation } from "react-router-dom";
import "./Homes.css";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({ location: "", minPrice: "", maxPrice: "" });
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false);
  const LIMIT = 12;

  const locationHook = useLocation();
  const searchQuery = new URLSearchParams(locationHook.search).get("search");
  const fallbackImage = "/images/placeholder.jpg";

  const fetchListings = useCallback(async () => {
    if (loading || !hasMore || isFetching.current) return;
    isFetching.current = true;
    setLoading(true);

    const params = new URLSearchParams({ limit: LIMIT, skip });
    if (searchQuery) params.append("location", searchQuery);
    else if (filters.location) params.append("location", filters.location);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

    try {
      const res = await axiosInstance.get(`/listings?${params.toString()}`);
      const newList = res.data.listings;

      setListings(prev => [...prev, ...newList]);
      setSkip(prev => prev + newList.length);
      if (newList.length < LIMIT) setHasMore(false);
    } catch (err) {
      console.error(err);
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  }, [filters, searchQuery, skip, hasMore, loading]);

  useEffect(() => {
    setListings([]); setSkip(0); setHasMore(true);
    fetchListings();
  }, [searchQuery, fetchListings]);

  useEffect(() => {
    let throttleId = null;

    const onScroll = () => {
      if (loading || throttleId != null) return;
      throttleId = setTimeout(() => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight + 200 >= scrollHeight && hasMore) {
          fetchListings();
        }
        throttleId = null;
      }, 200);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [fetchListings, loading, hasMore]);

  const handleSearch = e => {
    e.preventDefault();
    setListings([]); setSkip(0); setHasMore(true);
    fetchListings();
  };

  return (
    <div className="home-container">
      <form className="filter-form" onSubmit={handleSearch}>
        {["location", "minPrice", "maxPrice"].map(name => (
          <input
            key={name}
            type={name.includes("Price") ? "number" : "text"}
            name={name}
            placeholder={name.replace(/([A-Z])/g, " $1").trim()}
            value={filters[name]}
            onChange={e => setFilters(f => ({ ...f, [name]: e.target.value }))}
          />
        ))}
        <button type="submit">Search</button>
      </form>

      <div className="listing-grid">
        {listings.map(l => (
          <div key={l._id} className="listing-card">
            <img
              src={l.images[0]}
              alt={l.title}
              loading="lazy"
              onError={e => (e.target.src = fallbackImage)}
            />
            <h3>{l.title}</h3>
            <p>{l.location}</p>
            <p>₹{l.price} / night</p>
          </div>
        ))}

        {loading && Array(6).fill().map((_, i) => (
          <div className="listing-card skeleton-card" key={i}>
            <div className="skeleton-img"></div>
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
            <div className="skeleton-line" />
          </div>
        ))}

        {!loading && listings.length === 0 && <p>No listings found.</p>}
      </div>
    </div>
  );
}
