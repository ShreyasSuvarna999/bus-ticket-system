const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ✅ Generate JWT Token
function generateToken(id) {
  return jwt.sign({ id }, "jwtsecretkey", { expiresIn: "1d" });
}

// ✅ REGISTER USER (with hashed password)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || "user"
    });

    res.json({
      message: "Registration successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ✅ LOGIN USER (with JWT token)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).json({ error: "Wrong password" });

  res.json({
    message: "Login successful",
    token: generateToken(user._id),
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
});

module.exports = router;
