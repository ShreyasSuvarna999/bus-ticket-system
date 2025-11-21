import { useState } from "react";
import "./AuthAnimated.css";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignUp
      ? "http://localhost:5000/api/users/register"
      : "http://localhost:5000/api/users/login";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message || data.error);
  };

  return (
    <div className="auth-wrapper">
      <div className={`auth-container ${isSignUp ? "right-panel-active" : ""}`}>
        {/* ---------- SIGN UP ---------- */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h2>Create Account ✨</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* ---------- LOGIN ---------- */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSubmit}>
            <h2>Welcome Back 👋</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>

        {/* ---------- OVERLAY PANEL ---------- */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h3>Welcome Back! 🚍</h3>
              <p>Already have an account? Log in to continue booking trips!</p>
              <button className="ghost" onClick={() => setIsSignUp(false)}>
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h3>Hello, Friend! 👋</h3>
              <p>Join us to start your journey and book seats easily!</p>
              <button className="ghost" onClick={() => setIsSignUp(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
