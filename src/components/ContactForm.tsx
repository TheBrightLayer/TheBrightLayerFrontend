import React, { useState } from "react";
import "../styles/ContactForm.css";

export function ContactForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setStatus("SUCCESS");
      form.reset();
    } else {
      setStatus("ERROR");
    }
  };

  return (
    <div className="contact-form-container">
      <h1>Let’s Talk</h1>
      <p>Fill out the form below and we’ll get back to you soon.</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Name
          <input type="text" name="name" required />
        </label>

        <label>
          Email
          <input type="email" name="email" required />
        </label>

        <label>
          Message
          <textarea name="message" rows={5} required></textarea>
        </label>

        <button type="submit">Send Message</button>
        {status === "SUCCESS" && (
          <p className="success">Thanks! We’ll be in touch.</p>
        )}
        {status === "ERROR" && (
          <p className="error">Oops! Something went wrong.</p>
        )}
      </form>
    </div>
  );
}
