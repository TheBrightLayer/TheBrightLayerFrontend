// src/pages/Careers.tsx
import React, { useState } from "react";
import "../styles/Careers.css";

const Careers: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",

    email: "",
    phone: "",
    company: "", // ✅ added so it won’t break
    position: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [scale, setScale] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  // Handle form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
          </div>

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
