import { useState } from "react";
import "./SearchBus.css";

const SearchBus = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState("");

  // Dropdown city list
  const cities = ["Bangalore", "Kundapura"];

  // === SEARCH HANDLER ===
  const handleSearch = async () => {
    if (!from || !to || !date) {
      setError("⚠️ Please select all fields");
      setBuses([]);
      return;
    }

    const response = await fetch("http://localhost:5000/api/buses/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, date }),
    });

    const data = await response.json();

    if (!response.ok) {
      setBuses([]);
      setError(data.error);
      return;
    }

    setBuses(data);
    setError("");
  };

  return (
    <div className="search-wrapper">

      {/* SEARCH CARD */}
      <div className="search-card">
        <h2>🔍 Search Buses</h2>

        {/* FROM */}
        <label>From</label>
        <select
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
            if (e.target.value === to) setTo("");
          }}
        >
          <option value="">Select Pickup</option>
          {cities
            .filter((city) => city !== to)
            .map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>

        {/* TO */}
        <label>To</label>
        <select
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
            if (e.target.value === from) setFrom("");
          }}
        >
          <option value="">Select Destination</option>
          {cities
            .filter((city) => city !== from)
            .map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
        </select>

        {/* DATE */}
        <label>Date of Journey</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* BUTTON */}
        <button className="search-btn" onClick={handleSearch}>
          Search Buses
        </button>

        {error && <p className="error-msg">{error}</p>}
      </div>

      {/* RESULT SECTION */}
      <div className="results">
        {buses.length > 0 && <h3>Available Buses</h3>}

        {/* If no buses */}
        {buses.length === 0 && error === "" && from && to && date && (
          <p className="no-bus">No buses found for this date & route.</p>
        )}

        {/* Bus Cards */}
        {buses.map((bus) => (
          <div key={bus._id} className="bus-card">
            <h4>{bus.busName}</h4>
            <p>{bus.from} ➝ {bus.to}</p>
            <p>⏱ {bus.departureTime} → {bus.arrivalTime}</p>
            <p>💺 Seats: {bus.totalSeats}</p>
            <p>💰 ₹{bus.price}</p>

            <button
              onClick={() => (window.location.href = `/seats/${bus._id}`)}
              className="book-btn"
            >
              View Seats
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBus;
