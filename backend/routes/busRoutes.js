const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");
const Booking = require("../models/Booking");

// === Add Bus ===
router.post("/add", async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.json({ message: "Bus added successfully", bus });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// === Search Bus (POST) ===
router.post("/search", async (req, res) => {
  try {
    const { from, to, date } = req.body;

    if (!from || !to || !date) {
      return res.status(400).json({ error: "Please provide from, to, and date" });
    }

    const buses = await Bus.find({
      from: { $regex: new RegExp(from, "i") },
      to: { $regex: new RegExp(to, "i") },
      date,
    });

    if (buses.length === 0) {
      return res.status(404).json({ error: "No buses found for this route/date" });
    }

    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// === Get booked seats for a bus ===
router.get("/seats/:busId", async (req, res) => {
  try {
    const busId = req.params.busId;
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    const bookings = await Booking.find({ busId });
    const bookedSeats = bookings.map((b) => b.seatNumber);

    res.json({
      totalSeats: bus.totalSeats,
      bookedSeats: bookedSeats,
      availableSeats: bus.totalSeats - bookedSeats.length,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
