import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homes from "./pages/Homes";
import ListingDetails from "./pages/ListingDetails";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Landing />
            </Layout>
          }
        />
        <Route
          path="/homes"
          element={
            <Layout>
              <Homes />
            </Layout>
          }
        />
        <Route
          path="/listing/:id"
          element={
            <Layout>
              <ListingDetails />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact/>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
