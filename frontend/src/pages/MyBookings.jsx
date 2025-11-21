import { useEffect, useState } from "react";

function MyBookings() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const [bookings, setBookings] = useState([]);
  const [confirmCancelId, setConfirmCancelId] = useState(""); // Which booking is asking confirmation
  const [cancelledIds, setCancelledIds] = useState([]); // Store cancelled bookings

  useEffect(() => {
    if (!userId) {
      window.location.href = "/";
      return;
    }

    async function fetchBookings() {
      const response = await fetch(
        `http://localhost:5000/api/bookings/user/${userId}`
      );

      const data = await response.json();
      setBookings(data);
    }

    fetchBookings();
  }, [userId]);

  // ✅ Confirm cancellation function
  async function handleConfirmCancellation(id) {
    const response = await fetch(
      `http://localhost:5000/api/bookings/${id}`,
      { method: "DELETE" }
    );

    const data = await response.json();

    if (response.ok) {
      // Mark the ticket as cancelled visually
      setCancelledIds([...cancelledIds, id]);

      // Close confirmation box
      setConfirmCancelId("");

      // Remove from UI list
      setBookings(bookings.filter((b) => b._id !== id));
    } else {
      alert(data.error);
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>My Bookings</h2>

      {bookings.length === 0 && <p>No bookings found</p>}

      {bookings.map((b) => (
        <div
          key={b._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginTop: "20px"
          }}
        >
          <h3>{b.busId.busName}</h3>
          <p>{b.busId.from} → {b.busId.to}</p>
          <p>Seat Number: {b.seatNumber}</p>
          <p>Booking Date: {b.bookingDate}</p>
          <p>Price Paid: ₹{b.totalPrice}</p>

          {/* ✅ If already cancelled */}
          {cancelledIds.includes(b._id) ? (
            <button
              style={{
                marginTop: "10px",
                background: "gray",
                color: "white",
                padding: "8px 12px",
                border: "none"
              }}
            >
              Ticket Cancelled
            </button>
          ) : confirmCancelId === b._id ? (
            <>
              {/* ✅ Confirmation UI */}
              <p style={{ color: "red", fontWeight: "bold" }}>Are you sure?</p>

              <button
                onClick={() => handleConfirmCancellation(b._id)}
                style={{
                  background: "red",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  marginRight: "10px",
                  cursor: "pointer"
                }}
              >
                Yes
              </button>

              <button
                onClick={() => setConfirmCancelId("")}
                style={{
                  background: "gray",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                No
              </button>
            </>
          ) : (
            <button
              onClick={() => setConfirmCancelId(b._id)}
              style={{
                marginTop: "10px",
                background: "red",
                color: "white",
                padding: "8px 12px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Cancel Ticket
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
