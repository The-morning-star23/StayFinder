import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ListingDetails.css";
import Map from "../components/Map";

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [bookingData, setBookingData] = useState({ startDate: "", endDate: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/listings/${id}`)
      .then((res) => setListing(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleMockPayment = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          listingId: listing._id,
          ...bookingData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Payment and booking successful (mock)!");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage("Payment failed. Please log in.");
    }
  };

  if (!listing) return <div className="details-loading">Loading...</div>;

  return (
    <div className="details-container">
      <h1 className="details-title">{listing.title}</h1>
      <p className="details-location">{listing.location}</p>
      <div className="details-images">
        {listing.images.map((img, index) => (
          <img key={index} src={img} alt={`img-${index}`} className="details-img" />
        ))}
      </div>
      <p className="details-description">{listing.description}</p>
      <div className="details-price">₹{listing.price} / night</div>

      <form onSubmit={(e) => e.preventDefault()} className="booking-form">
        <h3 className="booking-title">Book This Stay</h3>
        <input
          type="date"
          name="startDate"
          value={bookingData.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={bookingData.endDate}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          onClick={handleMockPayment}
          className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4"
        >
          Pay & Book Now
        </button>
        {message && <p className="booking-message">{message}</p>}
      </form>

      {listing.coordinates && (
        <Map longitude={listing.coordinates[0]} latitude={listing.coordinates[1]} />
        )}
    </div>
  );
}

export default ListingDetails;
