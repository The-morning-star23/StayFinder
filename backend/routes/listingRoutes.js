const express = require("express");
const {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getAllListings);            // GET /api/listings
router.get("/:id", getListingById);         // GET /api/listings/:id

// Protected Routes
router.post("/", authMiddleware, createListing);        // POST /api/listings
router.put("/:id", authMiddleware, updateListing);      // PUT /api/listings/:id
router.delete("/:id", authMiddleware, deleteListing);   // DELETE /api/listings/:id

module.exports = router;
