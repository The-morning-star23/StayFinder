const Listing = require("../models/Listing");

// GET /api/listings?location=City&minPrice=1000&maxPrice=5000&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
exports.getAllListings = async (req, res) => {
  try {
    const {
      location = "",
      minPrice,
      maxPrice,
      limit = 12,
      skip = 0,
    } = req.query;

    const filters = {};

    // Text search by location
    if (location) {
      filters.location = { $regex: location, $options: "i" };
    }

    // Price filter
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseInt(minPrice);
      if (maxPrice) filters.price.$lte = parseInt(maxPrice);
    }

    // Convert skip and limit
    const skipVal = parseInt(skip);
    const limitVal = parseInt(limit);

    // Fetch listings and total count
    const [listings, total] = await Promise.all([
      Listing.find(filters)
        .sort({ createdAt: -1 })
        .skip(skipVal)
        .limit(limitVal)
        .populate("host", "name email"),
      Listing.countDocuments(filters),
    ]);

    res.status(200).json({ listings, total });
  } catch (err) {
    console.error("Listing fetch error:", err.message);
    res.status(500).json({ message: "Server error while fetching listings" });
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
