const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const { listingId, checkIn, checkOut } = req.body;
  const userId = req.user.id; // set by auth middleware

  try {
    const booking = await Booking.create({
      user: userId,
      listing: listingId,
      checkIn,
      checkOut
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
