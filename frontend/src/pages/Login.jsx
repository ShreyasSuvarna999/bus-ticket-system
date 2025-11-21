import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPage.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setMessage("Login successful!");

      if (data.user.role === "admin") navigate("/admin/dashboard");
      else navigate("/search");
    } else {
      setMessage(data.error || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* LEFT FORM */}
        <div className="auth-form">
          <h2>Welcome Back 👋</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p style={{ marginTop: "15px", color: "gray" }}>
            Don’t have an account? <Link to="/signup">Signup</Link>
          </p>
          <p>{message}</p>
        </div>

        {/* RIGHT PANEL */}
        <div className="auth-panel">
          <h3>Hello, Friend! 👋</h3>
          <p>New here? Join us to start booking your seats effortlessly!</p>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
