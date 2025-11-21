import { useSearchParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "./Ticket.css";

const Ticket = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const seat = params.get("seatId");
  const price = params.get("price");
  const method = params.get("method");

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Bus Ticket Receipt", 70, 20);

    doc.setFontSize(14);
    doc.text(`Seat Number: ${seat}`, 20, 50);
    doc.text(`Amount Paid: ₹${price}`, 20, 65);
    doc.text(`Payment Method: ${method}`, 20, 80);

    doc.save("ticket.pdf");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="ticket-wrapper">
      <div className="ticket-card">
        <h2>🎉 Payment Successful</h2>

        <p><strong>Seat:</strong> {seat}</p>
        <p><strong>Amount Paid:</strong> ₹{price}</p>
        <p><strong>Payment Method:</strong> {method}</p>

        <button className="download-btn" onClick={downloadPDF}>
          📄 Download Ticket (PDF)
        </button>

        {/* 🚪 LOGOUT BUTTON */}
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Ticket;
