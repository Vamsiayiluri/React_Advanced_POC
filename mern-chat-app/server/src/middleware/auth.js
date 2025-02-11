const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token missing!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(401).json({
      message:
        error instanceof jwt.TokenExpiredError
          ? "Unauthorized, token expired!"
          : "Unauthorized, invalid token!",
    });
  }
};

module.exports = authMiddleware;
