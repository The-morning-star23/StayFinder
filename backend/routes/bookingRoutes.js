const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");
const protect = require("../middleware/authMiddleware");

// Route to create a booking in DB
router.post("/", protect, createBooking);

module.exports = router;
