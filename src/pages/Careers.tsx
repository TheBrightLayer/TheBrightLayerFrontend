// src/pages/Careers.tsx
import React, { useState } from "react";
import "../styles/Careers.css";

const Careers: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "", // ✅ keeping it for resume link
    position: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [scale, setScale] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    // simulate API call
    setTimeout(() => {
      setStatus("Application submitted successfully ✅");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <section className="careers">
      <div className="careers-header">
        <h1>Join Our Team</h1>
        <p>
          At BrightLayer, we’re always looking for talented individuals who are
          passionate about innovation and technology. Explore exciting
          opportunities and grow with us!
        </p>
      </div>

      <form
        className="careers-form"
        onSubmit={handleSubmit}
        style={{ transform: `scale(${scale})` }} // ✅ fixed template string
        onMouseEnter={() => setScale(1.02)}
        onMouseLeave={() => setScale(1)}
      >
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Resume (link)</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Paste your resume link here"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Application
        </button>

        {status && <p className="status">{status}</p>}
      </form>
    </section>
  );
};

export default Careers;
