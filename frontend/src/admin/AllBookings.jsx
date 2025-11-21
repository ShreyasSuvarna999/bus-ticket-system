import { useEffect, useState } from "react";

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setMessage("Unauthorized — please login as admin.");
      return;
    }

    async function fetchBookings() {
      try {
        const response = await fetch("http://localhost:5000/api/admin/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.ok) setBookings(data);
        else setMessage(data.error || "Failed to fetch bookings");
      } catch (err) {
        setMessage("Error fetching bookings");
      }
    }

    fetchBookings();
  }, [token]);

  return (
    <div style={container}>
      <h2>All Bookings 🧾</h2>

      {message && <p style={msgStyle}>{message}</p>}

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div style={grid}>
          {bookings.map((b) => (
            <div key={b._id} style={card}>
              <h3>{b.busId?.busName}</h3>
              <p><strong>{b.busId?.from}</strong> → <strong>{b.busId?.to}</strong></p>
              <p>Seat: {b.seatNumber}</p>
              <p>Price: ₹{b.totalPrice}</p>
              <p>Date: {b.bookingDate}</p>
              <hr />
              <p>👤 <strong>{b.userId?.name}</strong></p>
              <p>📧 {b.userId?.email}</p>
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
  textAlign: "left",
};

const msgStyle = { color: "#2c3e50", marginBottom: "10px" };

export default AllBookings;
