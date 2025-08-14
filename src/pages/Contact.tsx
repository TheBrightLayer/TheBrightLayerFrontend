import React, { useState } from "react";
import emailjs from "emailjs-com";
import logo from "../assets/BrightLayerLogo.png";
import node from "../assets/node-icon.png";
import { Link } from "react-router-dom";
import reactLogo from "../assets/image-167-1.png";
import angularLogo from "../assets/Group-36806-1.png";

import "../styles/ContactForm.css";

const TECHNOLOGIES = [
  { name: "Node.js", logo: node as string },
  { name: "React", logo: reactLogo as string },

  { name: "Angular", logo: angularLogo as string },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .send(
        "service_0slomww", // from EmailJS dashboard
        "template_qv89fff", // from EmailJS dashboard
        formData,
        "QwUiRNVdw23fTWIrr" // EmailJS public key
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({
            name: "",
            company: "",
            email: "",
            phone: "",
            message: "",
          });
        },
        (error) => {
          console.error(error);
          setStatus("Failed to send. Please try again later.");
        }
      );
  };

  return (
    <div className="contact-container">
      <div className="hero-logo">
        <Link to="/">
          <img src={logo} alt="BrightLayer Logo" className="logo" />
        </Link>
      </div>

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

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company (optional)"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="Email ID*"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone no. (optional)"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-row full-width">
            <textarea
              name="message"
              placeholder="Message*"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit">SEND</button>
          </div>

          {status && <p className="status-message">{status}</p>}
        </form>
      </div>

      {/* ---- Technologies We Use (AFTER the form) ---- */}
      <section className="tech-section">
        <h2>
          <span>Technologies</span> We Use
        </h2>

        <ul className="tech-grid">
          {TECHNOLOGIES.map((t) => (
            <li key={t.name} className="tech-item">
              <img src={t.logo} alt={t.name} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Contact;
