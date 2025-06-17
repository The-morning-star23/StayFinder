const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
  checkIn: Date,
  checkOut: Date,
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
