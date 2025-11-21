const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus" },
  seatNumber: Number,
  totalPrice: Number,
  bookingDate: String
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
