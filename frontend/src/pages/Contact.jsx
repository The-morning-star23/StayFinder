import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-overlay">
          <h1 className="contact-title">Need Help? We're Here for You.</h1>
          <p className="contact-subtitle">Have questions or need assistance? Reach out anytime.</p>
          <div className="contact-buttons">
            <Link to="/register" className="btn-primary">Register</Link>
            <Link to="/login" className="btn-secondary">Login</Link>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info">
        <h2>Contact Information</h2>
        <p>Email: support@stayfinder.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: 221B StayFinder Street, Bangalore, India</p>
      </section>

      {/* FAQs */}
      <section className="faqs">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>How do I register as a host?</h3>
          <p>You can register by clicking the 'Register' button and selecting the Host option.</p>
        </div>
        <div className="faq-item">
          <h3>What payment methods are supported?</h3>
          <p>We support UPI, Credit/Debit Cards, and Netbanking.</p>
        </div>
        <div className="faq-item">
          <h3>How do I contact support?</h3>
          <p>You can email us or submit a support ticket below.</p>
        </div>
      </section>

      {/* Ticket Form */}
      <section className="ticket-form">
        <h2>Submit a Support Ticket</h2>
        <form>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Describe your issue" rows="5" required />
          <button type="submit" className="btn-primary">Submit Ticket</button>
        </form>
      </section>
    </div>
  );
}

export default Contact;
