import React, { useState } from "react";
import axios from "../axios";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", formData);
      setMessage("Account created successfully!");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage("Registration failed. Please try again.");
    }
  };

  const handleGoogleSignup = () => {
    alert("Google signup integration goes here.");
    // Typically you'd redirect to your OAuth endpoint.
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create an Account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit" className="btn-primary">Register</button>
        <div className="divider">or</div>
        <button type="button" className="btn-google" onClick={handleGoogleSignup}>Sign Up with Google</button>
        {message && <p className="register-message">{message}</p>}
      </form>
    </div>
  );
}

export default Register;
