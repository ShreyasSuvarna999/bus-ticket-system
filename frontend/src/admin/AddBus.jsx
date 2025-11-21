import { useState } from "react";

function AddBus() {
  const [busName, setBusName] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleAddBus = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Unauthorized. Please login as admin.");
      return;
    }

    const busData = {
      busName,
      busNumber,
      from,
      to,
      departureTime,
      arrivalTime,
      totalSeats,
      price,
      date,
    };

    try {
      const response = await fetch("http://localhost:5000/api/admin/bus/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Send JWT Token
        },
        body: JSON.stringify(busData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Bus added successfully!");
        setBusName("");
        setBusNumber("");
        setFrom("");
        setTo("");
        setDepartureTime("");
        setArrivalTime("");
        setTotalSeats("");
        setPrice("");
        setDate("");
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      setMessage("⚠️ Error adding bus. Try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Add New Bus 🚌</h2>

      <form onSubmit={handleAddBus} style={formStyle}>
        <input
          type="text"
          placeholder="Bus Name"
          value={busName}
          onChange={(e) => setBusName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Bus Number"
          value={busNumber}
          onChange={(e) => setBusNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Departure Time (e.g., 09:00 AM)"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Arrival Time (e.g., 03:30 PM)"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Total Seats"
          value={totalSeats}
          onChange={(e) => setTotalSeats(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Ticket Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit" style={buttonStyle}>
          ➕ Add Bus
        </button>
      </form>

      <p style={{ color: "#2c3e50", marginTop: "20px" }}>{message}</p>
    </div>
  );
}

// 💅 Simple Styling
const containerStyle = {
  maxWidth: "500px",
  margin: "50px auto",
  padding: "30px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#27ae60",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default AddBus;
