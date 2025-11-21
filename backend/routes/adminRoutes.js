const express = require("express");
const router = express.Router();
const Bus = require("../models/Bus");
const Booking = require("../models/Booking");
const adminAuth = require("../middleware/adminMiddleware");

// ✅ ADD BUS (ADMIN ONLY)
router.post("/bus/add", adminAuth, async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.json({ message: "Bus added successfully", bus });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ GET ALL BUSES
router.get("/bus/all", adminAuth, async (req, res) => {
  const buses = await Bus.find();
  res.json(buses);
});

// ✅ DELETE BUS
router.delete("/bus/delete/:id", adminAuth, async (req, res) => {
  const bus = await Bus.findByIdAndDelete(req.params.id);

  if (!bus) {
    return res.status(404).json({ error: "Bus not found" });
  }

  res.json({ message: "Bus deleted successfully" });
});

// ✅ GET ALL BOOKINGS
router.get("/bookings", adminAuth, async (req, res) => {
  const bookings = await Booking.find().populate("busId").populate("userId");
  res.json(bookings);
});

module.exports = router;
