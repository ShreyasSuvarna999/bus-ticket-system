const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");

app.use(cors());           // ✅ Allow frontend to access backend
app.use(express.json());

connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/buses", require("./routes/busRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
//app.use("/api/seats", require("./routes/seatsRoutes"));

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
