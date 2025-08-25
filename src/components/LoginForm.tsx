import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onClose }: { onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      let data: any = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.warn("Response not JSON:", err, text);
        }
      }

      if (!res.ok) {
        setError(data?.msg || "Login failed");
        return;
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
        navigate("/blogs");
      } else setError("Login succeeded but no token returned.");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();

      let data: any = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.warn("Response not JSON:", err, text);
        }
      }

      if (!res.ok) {
        setError(data?.msg || "Registration failed");
        return;
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
        navigate("/blogs");
      } else setError("Registration succeeded but no token returned.");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(20, 20, 30, 0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          borderRadius: "15px",
          padding: "2.5rem 2rem",
          width: "420px",
          maxWidth: "90%",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)",
          color: "#fff",
          position: "relative",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          animation: "slideFade 0.4s ease forwards",
        }}
      >
        <button
          onClick={() => navigate("/blogs")}
          style={{
            position: "absolute",
            top: "15px",
            right: "20px",
            background: "none",
            border: "none",
            fontSize: "1.6rem",
            color: "#fff",
            cursor: "pointer",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "rotate(90deg)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "none";
          }}
        >
          ✖
        </button>

        <h2
          style={{
            textAlign: "center",
            fontSize: "1.8rem",
            marginBottom: "0.3rem",
            letterSpacing: "1px",
          }}
        >
          {isLogin ? "Login" : "Register"}
        </h2>

        {error && (
          <p
            style={{
              color: "#ff4d4f",
              fontSize: "0.9rem",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {error}
          </p>
        )}

        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "12px",
              border: "none",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontSize: "1rem",
              outline: "none",
              transition: "background 0.3s, transform 0.2s",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "0.8rem 1rem",
              borderRadius: "12px",
              border: "none",
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontSize: "1rem",
              outline: "none",
              transition: "background 0.3s, transform 0.2s",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
            }
          />
          <button
            type="submit"
            style={{
              padding: "0.8rem",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #6a0dad, #ff00ff)",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 6px 15px rgba(255, 0, 255, 0.3)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(255, 0, 255, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 6px 15px rgba(255, 0, 255, 0.3)";
            }}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p
          style={{
            marginTop: "1.2rem",
            textAlign: "center",
            fontSize: "0.9rem",
            color: "#ccc",
          }}
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#ff00ff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#ff99ff")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#ff00ff")}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
