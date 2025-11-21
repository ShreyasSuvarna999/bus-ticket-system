import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPage.css";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Signup successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } else {
      setMessage(data.error || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* LEFT INFO PANEL */}
        <div className="auth-panel">
          <h3>Welcome Back! 🚍</h3>
          <p>Already a member? Log in and continue booking your trips.</p>
          <Link to="/">Login</Link>
        </div>

        {/* RIGHT FORM */}
        <div className="auth-form">
          <h2>Create Account ✨</h2>
          <form onSubmit={handleSignup}>
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <button type="submit">Signup</button>
          </form>
          <p style={{ marginTop: "15px", color: "gray" }}>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
