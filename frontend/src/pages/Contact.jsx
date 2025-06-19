import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";

function Contact() {
  return (
      <div className="contact-page">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="contact-overlay">
            <h1 className="contact-title">Need Help? We're Here for You.</h1>
            <p className="contact-subtitle">
              Our team is ready to assist you with any questions or concerns you may have.
            </p>
            <div className="contact-buttons">
              <Link to="/register" className="btn-primary">Register</Link>
              <Link to="/login" className="btn-secondary">Login</Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h4>How do I become a host on StayFinder?</h4>
              <p>Simply register, complete your profile, and list your property under the hosting dashboard.</p>
            </div>
            <div className="faq-item">
              <h4>What if I face an issue with my booking?</h4>
              <p>You can raise a support ticket or reach out to our 24/7 help desk for quick assistance.</p>
            </div>
            <div className="faq-item">
              <h4>Is my payment information secure?</h4>
              <p>Absolutely. We use encrypted payment gateways to ensure your data is safe.</p>
            </div>
          </div>
        </section>

        {/* Support Ticket */}
        <section className="support">
          <h2 className="section-title">Still Have Questions?</h2>
          <p className="support-text">Raise a ticket and we’ll get back to you within 24 hours.</p>
          <button className="btn-primary">Create Support Ticket</button>
        </section>

        {/* Contact Info */}
        <section className="contact-info">
          <h2 className="section-title">Contact Information</h2>
          <div className="info-grid">
            <div className="info-box">
              <h4>Email</h4>
              <p>support@stayfinder.com</p>
            </div>
            <div className="info-box">
              <h4>Phone</h4>
              <p>+91 9876543210</p>
            </div>
            <div className="info-box">
              <h4>Address</h4>
              <p>StayFinder HQ, Bengaluru, India</p>
            </div>
          </div>
        </section>
      </div>
  );
}

export default Contact;
