const express = require("express");
const { getAllListings, getListingById } = require("../controllers/listingController");
const { createListing, updateListing, deleteListing } = require("../controllers/listingController");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.get("/", getAllListings);
router.get("/:id", getListingById);
// Add a new listing
router.post("/", authMiddleware, createListing);

// Update a listing
router.put("/:id", authMiddleware, updateListing);

// Delete a listing
router.delete("/:id", authMiddleware, deleteListing);


module.exports = router;

// GET /api/listings?location=Delhi&minPrice=1000&maxPrice=5000
exports.getAllListings = async (req, res) => {
  try {
    const { location, minPrice, maxPrice } = req.query;

    const query = {};

    if (location) query.location = { $regex: location, $options: "i" };
    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

    const listings = await Listing.find(query).populate("host", "name email");
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
