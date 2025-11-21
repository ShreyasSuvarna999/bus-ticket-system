import { useState } from "react";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error);
      return;
    }

    if (data.user.role !== "admin") {
      setMessage("Access denied. You are not an admin.");
      return;
    }

    // ✅ Store admin token
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("adminInfo", JSON.stringify(data.user));

    window.location.href = "/admin/dashboard";
  };

  return (
    <div style={{ maxWidth: "300px", margin: "50px auto" }}>
      <h2>Admin Login</h2>

      <form onSubmit={handleAdminLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default AdminLogin;
