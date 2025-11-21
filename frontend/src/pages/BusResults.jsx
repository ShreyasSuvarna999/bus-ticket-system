import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BusResults.css";

const BusResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date } = location.state || {};

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!from || !to || !date) return;

    fetch("http://localhost:5000/api/buses/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, date }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.error) setBuses([]);
        else setBuses(data);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="bus-results-wrapper">
      <h2>Available Buses</h2>

      {buses.length === 0 ? (
        <div className="no-bus">
          <h3>No buses available for this route/date ❌</h3>
          <button onClick={() => navigate("/search")}>⬅ Back to Search</button>
        </div>
      ) : (
        buses.map((bus) => (
          <div key={bus._id} className="bus-card">
            <h3>{bus.busName}</h3>

            <p>
              <strong>From:</strong> {bus.from} &nbsp; | &nbsp;
              <strong>To:</strong> {bus.to}
            </p>

            <p>
              <strong>Timing:</strong> {bus.departureTime} → {bus.arrivalTime}
            </p>

            <p>
              <strong>Price:</strong> ₹{bus.price}
            </p>

            <button onClick={() => navigate(`/seats/${bus._id}`)}>
              View Seats
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BusResults;
