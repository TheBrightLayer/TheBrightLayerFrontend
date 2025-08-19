// src/pages/Careers.tsx
import React, { useState } from "react";
import "../styles/Careers.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
  resume: string;
  message: string;
  company: string; // ✅ Added company field
}

const Careers: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    resume: "",
    message: "",
    company: "", // ✅ Added here as well
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Application submitted successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      resume: "",
      message: "",
      company: "", // ✅ Reset company on submit
    });
  };

  return (
    <section className="careers-page">
      <h2>Join Our Team</h2>
      <p>
        At Bright Layer, we believe in innovation, growth, and building a
        brighter future together. If you’re passionate about technology and
        creating impact, we’d love to hear from you.
      </p>

      <form onSubmit={handleSubmit} className="career-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Current Company</label>
          <input
            type="text"
            name="company"
            id="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your current or last company"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="resume">Resume Link</label>
          <input
            type="url"
            name="resume"
            id="resume"
            value={formData.resume}
            onChange={handleChange}
            placeholder="Paste Google Drive / LinkedIn / Portfolio link"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Why do you want to join us?</label>
          <textarea
            name="message"
            id="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <
