import React from "react";
import { motion } from "framer-motion"; // npm install framer-motion

export function Hero() {
  const buttonStyle: React.CSSProperties = {
    marginTop: "20px",
    padding: "14px 38px",
    background: "linear-gradient(135deg, #ffcc00, #ff9900)", // Brand yellow gradient
    color: "#000",
    fontWeight: 700,
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    letterSpacing: "0.6px",
    boxShadow: "0 4px 12px rgba(255, 204, 0, 0.4)",
    transition: "all 0.3s ease",
  };

  return (
    <section
      style={{
        background: "#000", // Same as original
        padding: "60px 10%",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Left Side - Heading */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            style={{
              fontSize: "3rem", // Original size
              lineHeight: 1.2,
              fontWeight: 700,
              marginBottom: "10px",
            }}
          >
            Web and Mobile App <br />
            <span style={{ color: "#fff" }}>Development</span> <br />
            <span style={{ color: "#fff" }}>Service</span>
          </h1>
        </motion.div>

        {/* Right Side - Description */}
        <motion.div
          style={{
            maxWidth: "500px",
            fontSize: "1.1rem", // Original size
            lineHeight: 1.6,
            color: "#e0e0e0",
          }}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p>
            Spark innovation and propel digital advancement with our outstanding
            Custom Web & Mobile App Development Services.
          </p>
          <motion.button
            style={buttonStyle}
            whileHover={{
              background: "linear-gradient(135deg, #ffd633, #ffad33)",
              scale: 1.05,
              boxShadow: "0 6px 20px rgba(255, 204, 0, 0.6)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            GETTING STARTED
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
