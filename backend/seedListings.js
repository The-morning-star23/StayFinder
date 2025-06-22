const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Listing = require("./models/Listing");

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const listings = [
  {
    title: "Cozy Beachfront Hut",
    description: "A relaxing beach hut with ocean view in Goa.",
    images: ["/images/listings/goa1.jpg"],
    location: "Goa, India",
    price: 7000,
    type: "Entire place",
  },
  {
    title: "Mountain Cabin Retreat",
    description: "Scenic cabin surrounded by Himalayan pine forests.",
    images: ["/images/listings/manali1.jpg"],
    location: "Manali, Himachal Pradesh, India",
    price: 9000,
    type: "Entire place",
  },
  {
    title: "Lakeview Homestay",
    description: "Traditional home stay with beautiful lake view.",
    images: ["/images/listings/alleppey1.jpg"],
    location: "Alleppey, Kerala, India",
    price: 5000,
    type: "Private room",
  },
  {
    title: "Cozy Hilltop Cabin",
    description: "A peaceful wooden cabin atop a lush hill, offering serene views and a cozy, fireplace-lit retreat.",
    images: ["/images/listings/stay1.jpg"],
    location: "Manali, Himachal Pradesh, India",
    price: 7500,
    type: "Entire place",
  },
  {
    title: "Beach-view House",
    description: "A breezy beachfront escape with stunning ocean views and direct access to golden sands.",
    images: ["/images/listings/stay2.jpg"],
    location: "Goa, India",
    price: 10000,
    type: "Entire place"
  },
  {
    title: "Jungle Treehouse",
    description: "A serene treetop retreat nestled in the heart of the jungle, perfect for nature lovers.",
    images: ["/images/listings/stay3.jpg"],
    location: "Shimla, India",
    price: 7000,
    type: "Entire place"
  },
  {
    title: "Backwater Villa Retreat",
    description: "Relax by the serene Alleppey backwaters in this heritage-style villa.",
    images: ["/images/listings/alleppey2.jpg"],
    location: "Shimla, India",
    price: 11000,
    type: "Entire place"
  },
  {
  title: "Modern City Apartment",
  description: "Stylish apartment in the heart of Bangalore with balcony views.",
  images: ["/images/listings/banglore1.jpg"],
  location: "Bangalore, India",
  price: 12000,
  type: "Entire place"
  },
  {
  title: "Luxury Private Room in Bangalore",
  description: "Spacious AC room with elegant wooden decor near city center.",
  images: ["/images/listings/banglore2.jpg"],
  location: "Bangalore, India",
  price: 9000,
  type: "Private room"
  },
  {
  title: "Hillside Cottages in Coorg",
  description: "Modern hillside cottages surrounded by lush greenery in Coorg.",
  images: ["/images/listings/coorg1.jpg"],
  location: "Coorg, India",
  price: 12000,
  type: "Entire place"
  },
  {
  title: "Tranquil Forest Stay",
  description: "A peaceful homestay nestled in the forested hills of Coorg.",
  images: ["/images/listings/coorg2.jpg"],
  location: "Coorg, India",
  price: 10000,
  type: "Entire place"
  },
  {
  title: "Charming Colonial Cottage",
  description: "A cozy British-era cottage with a lush garden in Darjeeling.",
  images: ["/images/listings/darjeeling1.jpg"],
  location: "Darjeeling, India",
  price: 11500,
  type: "Entire place"
  },
  {
  title: "Rustic Mountain Attic",
  description: "A warm and charming attic room perfect for hillside escapes in Darjeeling.",
  images: ["/images/listings/darjeeling2.jpg"],
  location: "Darjeeling, India",
  price: 7000,
  type: "Private room"
  },
  {
  title: "Minimalist Studio Flat",
  description: "A clean and cozy studio flat in the heart of New Delhi.",
  images: ["/images/listings/delhi1.jpg"],
  location: "New Delhi, India",
  price: 6500,
  type: "Entire place"  
  },
  {
  title: "Urban Chic Apartment",
  description: "A trendy studio with modern interiors in central Delhi.",
  images: ["/images/listings/delhi2.jpg"],
  location: "New Delhi, India",
  price: 6000,
  type: "Private room"
  },
  {
  title: "Seaside Hammock Cottage",
  description: "A serene beachfront cottage with hammock and cozy seating in Goa.",
  images: ["/images/listings/goa2.jpg"],
  location: "Goa, India",
  price: 7000,
  type: "Entire place" 
  },
  {
  title: "Luxury Poolside Villa",
  description: "A premium beachfront villa with private pool and sun deck in Goa.",
  images: ["/images/listings/goa3.jpg"],
  location: "Goa, India",
  price: 15000,
  type: "Entire place"
  },
  {
  title: "Bohemian Heritage Stay",
  description: "A charming Portuguese-style stay with hammock and heritage vibe in Goa.",
  images: ["/images/listings/goa4.jpg"],
  location: "Goa, India",
  price: 4500,
  type: "Private room"
  },
  {
  title: "Modern City Apartment",
  description: "A stylish and cozy apartment in the heart of Gurgaon’s tech hub.",
  images: ["/images/listings/gurgaon1.jpg"],
  location: "Gurgaon, Haryana",
  price: 6000,
  type: "Entire place",
  },
  {
  title: "Elegant Apartment in gurgaon",
  description: "Charming and central apartment located in Gurgaon.",
  images: ["/images/listings/gurgaon2.jpg"],
  location: "Gurgaon, Haryana",
  price: 6500,
  type: "Entire place"
  },
  {
    title: "Heritage Stay in Jaipur",
    description: "Live like royalty in a traditional Rajasthani haveli.",
    images: ["/images/listings/jaipur1.jpg"],
    location: "Jaipur, Rajasthan, India",
    price: 6500,
    type: "Private room"
  },
  {
  title: "Rajasthani suite",
  description: "Suite available in pink city of India.",
  images: ["/images/listings/jaipur2.jpg"],
  location: "Jaipur, Rajasthan",
  price: 9000,
  type: "Private room"
  },
  {
  title: "Forest-view chalet",
  description: "A wooden chalet with stunning forest-view.",
  images: ["/images/listings/kodaikanal1.jpg"],
  location: "Kodaikanal, Tamil Nadu",
  price: 5000,
  type: "Private room"
  },
  {
  title: "Modern hill cottage",
  description: "A Modern hill cottage in Kodaikanal.",
  images: ["/images/listings/kodaikanal2.jpg"],
  location: "Kodaikanal, Tamil Nadu",
  price: 4500,
  type: "Private room"
  },
  {
    title: "Luxury Apartment in Kolkata",
    description: "Modern apartment ideal for business travelers.",
    images: ["/images/listings/kolkata1.jpg"],
    location: "Kolkata, West Bengal",
    price: 7000
  },
   {
    title: "Private stay in Kolkata",
    description: "Private stay ideal for working professionals.",
    images: ["/images/listings/kolkata2.jpg"],
    location: "Kolkata, West Bengal",
    price: 7000
  },
  {
    title: "Beautiful and cozy cabin",
    description: "Wooden cabin with stunning views in Manali.",
    images: ["/images/listings/manali2.jpg"],
    location: "Manali, Himachal Pradesh, India",
    price: 8000,
    type: "Entire place",
  },
  {
    title: "Luxury apartment",
    description: "Luxury apartment with skyline views",
    images: ["/images/listings/mumbai1.jpg"],
    location: "Mumbai, Maharashtra",
    price: 12000,
    type: "Entire place"
  },
  {
    title: "Luxury penthouse in Mumbai",
    description: "Luxury apartment with beautiful sea view",
    images: ["/images/listings/mumbai2.jpg"],
    location: "Mumbai, Maharashtra",
    price: 15000,
    type: "Entire place"
  },
  {
    title: "Cozy House",
    description: "Peaceful stay, perfect for relaxing getaways.",
    images: ["/images/listings/munnar1.jpg"],
    location: "Munnar, Kerala",
    price: 7000,
    type: "Entire place"
  },
  {
    title: "Hillside cottage",
    description: "Beautiful cottage beside hills.",
    images: ["/images/listings/munnar2.jpg"],
    location: "Munnar, Kerala",
    price: 10000,
    type: "Entire place"
  },
  {
    title: "Beautiful stay in Nainital",
    description: "Beautiful, relaxing stay beside hills.",
    images: ["/images/listings/nainital1.jpg"],
    location: "Nainital, Uttarakhand",
    price: 8000,
    type: "Private room"
  },
  {
    title: "Scenic hillside cottage",
    description: "Beautiful, relaxing stay beside hills.",
    images: ["/images/listings/nainital2.jpg"],
    location: "Nainital, Uttarakhand",
    price: 5000,
    type: "Private room"
  },
  {
    title: "Beautiful cottage",
    description: "Beautiful cottage with stunning views of lush vegetation and grasslands.",
    images: ["/images/listings/ooty1.jpg"],
    location: "Ooty, Tamil Nadu",
    price: 5000,
    type: "Private room"
  },
  {
    title: "Luxury villa",
    description: "Experience Ooty  with stunning hill views & hotel-style comfort.",
    images: ["/images/listings/ooty2.jpg"],
    location: "Ooty, Tamil Nadu",
    price: 13000,
    type: "Private room"
  },
  {
    title: "Budget-Beautiful villa",
    description: "Small but beautiful luxury villa in Pune.",
    images: ["/images/listings/pune1.jpg"],
    location: "Pune, Maharashtra",
    price: 10000,
    type: "Entire place"
  },
  {
    title: "Private House",
    description: "Luxurious house with courtyard.",
    images: ["/images/listings/pune2.jpg"],
    location: "Pune, Maharashtra",
    price: 11000,
    type: "Entire place"
  },
  {
    title: "cozy house in Rishikesh",
    description: "cozy and beautiful house for relaxing and peace.",
    images: ["/images/listings/rishikesh1.jpg"],
    location: "Rishikesh, Uttarakhand",
    price: 7500,
    type: "Private room"
  },
  {
    title: "Private villa",
    description: "Beautiful and private villa.",
    images: ["/images/listings/rishikesh2.jpg"],
    location: "Rishikesh, Uttarakhand",
    price: 11000,
    type: "Entire place"
  },
  {
    title: "villa in hills",
    description: "cozy and peaceful villa in hills.",
    images: ["/images/listings/shimla1.jpg"],
    location: "Shimla, Himachal Pradesh",
    price: 13000,
    type: "Entire place"
  },
  {
    title: "Luxurious house",
    description: "Modern and luxury-built Bungalow with a Glass House.",
    images: ["/images/listings/shimla2.jpg"],
    location: "Shimla, Himachal Pradesh",
    price: 10000,
    type: "Entire place"
  },
  {
    title: "Guest House",
    description: "Elegantly designed & well decorated private room which provide atheistic & cozy stay.",
    images: ["/images/listings/udaipur1.jpg"],
    location: "Udaipur, Rajasthan",
    price: 8000,
    type: "Entire place"
  },
  {
    title: "Modern-Luxury vila",
    description: "Elegantly designed & luxurious private villa.",
    images: ["/images/listings/udaipur2.jpg"],
    location: "Udaipur, Rajasthan",
    price: 16000,
    type: "Entire place"
  },
  
];

const seedListings = async () => {
  try {
    await Listing.deleteMany();
    await Listing.insertMany(listings);
    console.log("Listings seeded successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedListings();
