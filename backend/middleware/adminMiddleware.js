const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function adminAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, "jwtsecretkey");

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    req.user = user; // attach admin details
    next();

  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = adminAuth;
