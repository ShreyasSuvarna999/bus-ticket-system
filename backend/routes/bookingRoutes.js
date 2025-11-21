const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Bus = require("../models/Bus");
const User = require("../models/User");

// ✅ BOOK A SEAT
router.post("/book", async (req, res) => {
  try {
    const { userId, busId, seatNumber } = req.body;

    console.log("Booking request received:", { userId, busId, seatNumber });

    // ✅ 1. Check if bus exists
    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ error: "Bus not found" });

    // ✅ 2. Check if user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // ✅ 3. Check if seat is already booked
    const seatTaken = await Booking.findOne({ busId, seatNumber });
    if (seatTaken) return res.status(400).json({ error: "Seat already booked" });

    // ✅ 4. Check if bus is full
    const allBookings = await Booking.find({ busId });
    if (allBookings.length >= bus.totalSeats) {
      return res.status(400).json({ error: "Bus is full" });
    }

    // ✅ 5. Auto calculate price and booking date
    const totalPrice = bus.price;
    const bookingDate = new Date().toISOString().split("T")[0];

    console.log("Creating booking with data:", {
      userId,
      busId,
      seatNumber,
      totalPrice,
      bookingDate
    });

    // ✅ 6. Create booking entry
    const booking = await Booking.create({
      userId,
      busId,
      seatNumber,
      totalPrice,
      bookingDate
    });

    res.json({ message: "Seat booked successfully", booking });

  } catch (error) {
    console.log("Booking error:", error);
    res.status(400).json({ error: error.message });
  }
});

// ✅ GET ALL BOOKINGS OF LOGGED-IN USER
router.get("/user/:id", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.id })
      .populate("busId"); // ✅ convert busId into full bus details

    res.json(bookings);
  } catch (error) {
    console.log("Get bookings error:", error);
    res.status(400).json({ error: error.message });
  }
});

// ✅ CANCEL BOOKING
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.log("Cancel booking error:", error);
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
