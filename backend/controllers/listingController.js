const Listing = require("../models/Listing");

// GET /api/listings?location=City&minPrice=1000&maxPrice=5000&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
exports.getAllListings = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, limit = 12, skip = 0 } = req.query;

    let filter = {};

    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
    }

    const listings = await Listing.find(filter)
      .sort({ createdAt: -1 }) // newest first
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .populate("host", "name email");

    const total = await Listing.countDocuments(filter); // for frontend to know total available

    res.json({ listings, total });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET listing by ID
exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("host", "name email");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST create listing
exports.createListing = async (req, res) => {
  try {
    const listing = new Listing({ ...req.body, host: req.user.id });
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ error: "Failed to create listing" });
  }
};

// PUT update listing
exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing || listing.host.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }
    const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

// DELETE listing
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing || listing.host.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }
    await listing.deleteOne();
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
