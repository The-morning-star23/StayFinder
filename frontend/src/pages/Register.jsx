import React, { useState } from "react";
import axios from "../axios";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", formData);
      setMessage("Registration successful! You can now log in.");
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage("Error creating account");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        {message && <p className="auth-message">{message}</p>}
      </form>
    </div>
  );
}

export default Register;
