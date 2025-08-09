import React from "react";
import "../styles/VideoShowcase.css";
import homeVideo from "../assets/Itobuz-Home-Vid.mp4";

export function VideoShowcase() {
  return (
    <section className="video-section">
      <div className="video-container">
        <video autoPlay muted loop playsInline>
          <source src={homeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
