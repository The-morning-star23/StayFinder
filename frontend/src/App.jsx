import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingDetails";
import Landing from "./pages/Landing";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path= "/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
