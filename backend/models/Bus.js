const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  busName: String,
  busNumber: String,
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String,
  totalSeats: Number,
  price: Number,
  date: String
}, { timestamps: true });

module.exports = mongoose.model("Bus", busSchema);
