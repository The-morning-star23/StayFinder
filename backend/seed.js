const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Listing = require("./models/Listing");
const Booking = require("./models/Booking");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const seed = async () => {
  await User.deleteMany();
  await Listing.deleteMany();
  await Booking.deleteMany();

  const user1 = await User.create({
    name: "Alice",
    email: "alice@example.com",
    password: "hashedpassword",
    isHost: true
  });

  const user2 = await User.create({
    name: "Bob",
    email: "bob@example.com",
    password: "hashedpassword",
    isHost: false
  });

  const listing1 = await Listing.create({
    title: "Cozy Beach House",
    description: "Beautiful stay near the ocean.",
    location: "Goa, India",
    price: 2500,
    images: [
      "https://source.unsplash.com/random/800x600/?beach,house"
    ],
    host: user1._id,
  });

  const listing2 = await Listing.create({
    title: "Mountain View Cabin",
    description: "Peaceful retreat in the hills.",
    location: "Manali, India",
    price: 3000,
    images: [
      "https://source.unsplash.com/random/800x600/?mountain,cabin"
    ],
    host: user1._id,
  });

  await Booking.create({
    user: user2._id,
    listing: listing1._id,
    checkIn: new Date("2025-07-01"),
    checkOut: new Date("2025-07-05")
  });

  console.log("✅ Seeded successfully");
  process.exit();
};

seed();
