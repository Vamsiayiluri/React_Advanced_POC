const express = require("express");
const { register, login } = require("../controllers/auth");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error in /me route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;
