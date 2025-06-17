const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: { type: String, required: true },
  price: { type: Number, required: true },
  images: [String],
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  coordinates: {
    type: [Number], // Format: [longitude, latitude]
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Listing", listingSchema);
