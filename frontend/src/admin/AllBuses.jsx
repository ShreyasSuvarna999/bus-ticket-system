import { useEffect, useState } from "react";

function AllBuses() {
  const [buses, setBuses] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // ✅ fetch all buses when page loads
  useEffect(() => {
    if (!token) {
      setMessage("Unauthorized — please login as admin.");
      return;
    }

    async function fetchBuses() {
      try {
        const response = await fetch("http://localhost:5000/api/admin/bus/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.ok) setBuses(data);
        else setMessage(data.error || "Failed to fetch buses");
      } catch (err) {
        setMessage("Error loading buses");
      }
    }

    fetchBuses();
  }, [token]);

  // ✅ delete a bus
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/bus/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("🗑️ Bus deleted successfully!");
        setBuses((prev) => prev.filter((bus) => bus._id !== id));
      } else {
        setMessage(data.error || "Error deleting bus");
      }
    } catch (err) {
      setMessage("Network error — try again");
    }
  };

  return (
    <div style={container}>
      <h2>All Buses 🚌</h2>

      {message && <p style={msgStyle}>{message}</p>}

      {buses.length === 0 ? (
        <p>No buses found</p>
      ) : (
        <div style={grid}>
          {buses.map((bus) => (
            <div key={bus._id} style={card}>
              <h3>{bus.busName}</h3>
              <p><strong>{bus.from}</strong> → <strong>{bus.to}</strong></p>
              <p>Departure: {bus.departureTime}</p>
              <p>Arrival: {bus.arrivalTime}</p>
              <p>Seats: {bus.totalSeats}</p>
              <p>Price: ₹{bus.price}</p>
              <p>Date: {bus.date}</p>

              <button style={delBtn} onClick={() => handleDelete(bus._id)}>
                ❌ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* 💅 Styling */
const container = {
  maxWidth: "900px",
  margin: "50px auto",
  textAlign: "center",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const card = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  backgroundColor: "#fff",
};

const delBtn = {
  backgroundColor: "#e74c3c",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "10px",
};

const msgStyle = { color: "#2c3e50", marginBottom: "10px" };

export default AllBuses;
