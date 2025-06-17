# StayFinder 🏡 – Airbnb-like Full Stack App

StayFinder is a full-stack single-vendor web application for booking and listing short-term rentals, inspired by platforms like Airbnb and NomadX.

---

## 🌐 Live Preview
Coming soon (post-deployment)

---

## 📦 Tech Stack

### Frontend
- React.js + Tailwind CSS
- React Router DOM
- Axios

### Backend
- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication

---

## 🧠 Features

### 👤 Authentication
- Register/Login with JWT
- Role-based access: Hosts can create/edit/delete listings

### 🏠 Listings
- View all listings on the homepage
- Listing detail page with images, description, price, and booking form
- Create, edit, delete listings (host only)

### 🔍 Filters & Search
- Search by location
- Filter by min/max price
- Date range filtering

### 📍 Map Integration
- Interactive Map (Mapbox/Google Maps optional)

### 💳 Mock Payment
- Simulates booking confirmation after form submission

---

## 🗂️ Project Structure

stayfinder/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── App.js
│ └── index.js


---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/stayfinder.git
cd stayfinder

### 2. Backend Setup
```bash
cd backend
npm install
touch .env

.env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

then :
```bash
npm run server

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start

🧑‍💻 Author
Shubh Kumar