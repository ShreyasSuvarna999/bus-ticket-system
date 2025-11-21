import { useState } from "react";
import "./SeatSelect.css";

const SeatSelect = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [price, setPrice] = useState(null);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // ✅ NEW

  const handleSeatClick = (seat) => {
    if (seat.status === "booked") return;

    setSelectedSeat(seat.id);
    setPrice(seat.price);
    setMessage("");
  };

  // === Confirm Booking Popup Trigger ===
  const handleBooking = () => {
    if (!selectedSeat) {
      setMessage("⚠️ Please select a seat before booking!");
      return;
    }
    setShowPopup(true); // ✅ Show popup
  };

  // === When user clicks YES ===
  const confirmBooking = () => {
    setShowPopup(false);
    window.location.href = `/payment?seatId=${selectedSeat}&price=${price}`;
  };

  // === When user clicks NO ===
  const cancelBooking = () => {
    setShowPopup(false);
  };

  // === Generate seats ===
  const generateSeats = () => {
    const arr = [];
    for (let i = 1; i <= 36; i++) {
      let deck = i <= 18 ? "lower" : "upper";
      let label = "";
      let price = 800;

      if (deck === "lower") {
        if (i <= 6) {
          label = `L${i}`;
          price = 950;
        } else {
          label = `LD${i - 6}`;
          price = 850;
        }
      } else {
        if (i <= 24) {
          label = `U${i - 18 + 1}`;
          price = 900;
        } else {
          label = `UD${i - 24}`;
          price = 800;
        }
      }

      arr.push({
        id: label,
        status: i % 7 === 0 ? "booked" : "available",
        price,
      });
    }
    return arr;
  };

  const seats = generateSeats();
  const lowerDeck = seats.slice(0, 18);
  const upperDeck = seats.slice(18, 36);

  const renderSeat = (seat) => (
    <div
      key={seat.id}
      className="seat-stack"
      onClick={() => handleSeatClick(seat)}
    >
      <span className="seat-number">{seat.id}</span>

      <div
        className={`sleeper vertical ${seat.status} ${
          selectedSeat === seat.id ? "selected" : ""
        }`}
      >
        <div className="bed-vertical"></div>
        {seat.status === "booked" && <span className="sold">Sold</span>}
      </div>

      <span className="price-tag">₹{seat.price}</span>
    </div>
  );

  const renderVerticalColumn = (colSeats, colIndex) => (
    <div key={colIndex} className="double-column">
      {colSeats.map(renderSeat)}
    </div>
  );

  return (
    <div className="seat-container">
      <h1>🚌 Select Your Seat</h1>

      <div className="deck-section">
        {/* LOWER DECK */}
        <div className="deck">
          <div className="deck-header">
            <h2>Lower deck</h2>
          </div>

          <div className="deck-layout">
            <div className="deck-side single">
              {lowerDeck.slice(0, 6).map(renderSeat)}
            </div>

            <div className="aisle"></div>

            <div className="deck-side right-columns">
              {renderVerticalColumn(lowerDeck.slice(6, 12), "L1")}
              {renderVerticalColumn(lowerDeck.slice(12, 18), "L2")}
            </div>
          </div>
        </div>

        {/* UPPER DECK */}
        <div className="deck">
          <div className="deck-header">
            <h2>Upper deck</h2>
          </div>

          <div className="deck-layout">
            <div className="deck-side single">
              {upperDeck.slice(0, 6).map(renderSeat)}
            </div>

            <div className="aisle"></div>

            <div className="deck-side right-columns">
              {renderVerticalColumn(upperDeck.slice(6, 12), "U1")}
              {renderVerticalColumn(upperDeck.slice(12, 18), "U2")}
            </div>
          </div>
        </div>
      </div>

      {/* BOOK BUTTON */}
      <button className="book-btn" onClick={handleBooking}>
        Book Seat
      </button>

      {message && <p className="message">{message}</p>}

      {/* ================= POPUP CONFIRMATION ================= */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>Confirm Booking?</h3>
            <p>
              Seat <strong>{selectedSeat}</strong> – Price{" "}
              <strong>₹{price}</strong>
            </p>

            <div className="popup-buttons">
              <button className="yes-btn" onClick={confirmBooking}>
                Yes
              </button>
              <button className="no-btn" onClick={cancelBooking}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <footer>© 2025 Bus Ticket System · Built by Shreyas 🚀</footer>
    </div>
  );
};

export default SeatSelect;
