import React, { useState, useEffect } from "react";
//import "../styles/ServicesPage.css";
import "../styles/Careers.css";
import logo from "../assets/BrightLayerLogo.png";
import bgVideo from "../assets/MD_Motion_001.mp4";
import serviceVideo from "../assets/3044681-uhd_3840_2160_24fps.mp4";
import "../styles/Card.css";
import emailjs from "emailjs-com";

import node from "../assets/node-icon.png";
import { Link } from "react-router-dom";
import reactLogo from "../assets/image-167-1.png";
import angularLogo from "../assets/Group-36806-1.png";

const Careers = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "", // ✅ fixed mismatch (was "resume")
    email: "",
    phone: "",
    message: "",
  });

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = 1 + scrollY * 0.0005; // ✅ your scaling logic unchanged
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="careers-page">
      <section className="hero-section">
        <h1>Careers at Bright Layer</h1>
        <p>Join us in building innovative digital solutions 🚀</p>
      </section>

      <section className="video-section">
        <div
          className="video-container"
          style={{ transform: `scale(${scale})` }} // ✅ fixed template string
        >
          <video
            className="background-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/office.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="form-section">
        <h2>Apply Now</h2>
        <form className="career-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Resume (link)"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Why do you want to join us?"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit Application</button>
        </form>
      </section>
    </div>
  );
};

export default Careers;
