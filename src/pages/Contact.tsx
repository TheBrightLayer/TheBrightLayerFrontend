import React from "react";
import "../styles/ContactForm.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <div className="contact-title">
          <h1>
            Share your <span>Project</span> <span>Details.</span>
          </h1>
          <p>
            Partner Up With <span className="highlight">A Top-Rated</span>{" "}
            Mobile App Development Company.
          </p>
        </div>
      </div>

      <div className="contact-form-card">
        <h2>
          We would be <span>happy to hear</span> from you!
        </h2>
        <form>
          <div className="form-row">
            <input type="text" placeholder="Name*" required />
            <input type="text" placeholder="Company (optional)" />
          </div>

          <div className="form-row">
            <input type="email" placeholder="Email ID*" required />
            <input type="tel" placeholder="Phone no. (optional)" />
          </div>

          <div className="form-row full-width">
            <textarea placeholder="Message*" rows={4} required></textarea>
          </div>

          <div className="form-actions">
            <button type="submit">SEND</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
