import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={wrapper}>
      <div style={container}>
        <h1 style={title}>🧑‍💼 Admin Dashboard</h1>
        <p style={subtitle}>
          Welcome, <strong>Admin</strong>! Manage your buses and bookings easily.
        </p>

        <div style={btnContainer}>
          <button style={btn} onClick={() => navigate("/admin/addbus")}>
            ➕ Add New Bus
          </button>

          <button style={btn} onClick={() => navigate("/admin/allbuses")}>
            🚌 View All Buses
          </button>

          <button style={btn} onClick={() => navigate("/admin/allbookings")}>
            📋 View All Bookings
          </button>

          <button style={logoutBtn} onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

/* 💅 Layout Fix */
const wrapper = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "80px",
};

const container = {
  textAlign: "center",
  fontFamily: "Poppins, sans-serif",
  width: "100%",
  maxWidth: "900px",
};

const title = {
  fontSize: "32px",
  marginBottom: "10px",
  justifyContent: "center"
};

const subtitle = {
  color: "#555",
  fontSize: "18px",
};

const btnContainer = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "20px",
  marginTop: "40px",
};

const btn = {
  background: "linear-gradient(90deg, #2563eb, #10b981)",
  color: "#fff",
  border: "none",
  padding: "12px 24px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  transition: "all 0.3s ease",
};

const logoutBtn = {
  ...btn,
  background: "linear-gradient(90deg, #e74c3c, #e67e22)",
};

export default AdminDashboard;
