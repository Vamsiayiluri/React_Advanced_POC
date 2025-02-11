const express = require("express");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("id name email avatar");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
