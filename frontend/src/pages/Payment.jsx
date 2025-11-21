import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Payment.css";

const Payment = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const seat = params.get("seatId");
  const price = params.get("price");

  const [method, setMethod] = useState("UPI");
  const [message, setMessage] = useState("");

  const handlePay = () => {
    setMessage("Processing Payment...");

setTimeout(() => {
  setMessage("✅ Payment Successful! 🎉");

  setTimeout(() => {
    navigate(`/ticket?seatId=${seat}&price=${price}&method=${method}`);
  }, 1500);
}, 1500);
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-card">
        <h2>💳 Payment Page</h2>

        <p className="info"><strong>Seat:</strong> {seat}</p>
        <p className="info"><strong>Amount:</strong> ₹{price}</p>

        <div className="pay-section">
          <label>Payment Method</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option>UPI</option>
            <option>Card</option>
            <option>NetBanking</option>
            <option>Cash</option>
          </select>

          {method === "UPI" && (
            <input type="text" placeholder="Enter UPI ID" className="pay-input" />
          )}

          {method === "Card" && (
            <>
              <input type="text" placeholder="Card Number" className="pay-input" />
              <input type="text" placeholder="Expiry (MM/YY)" className="pay-input" />
              <input type="text" placeholder="CVV" className="pay-input" />
            </>
          )}

          {method === "NetBanking" && (
            <select className="pay-input">
              <option>Select Bank</option>
              <option>SBI</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Kotak Bank</option>
            </select>
          )}
        </div>

        <button className="pay-btn" onClick={handlePay}>
          Pay Now
        </button>

        {message && <p className="msg">{message}</p>}
      </div>
    </div>
  );
};

export default Payment;
