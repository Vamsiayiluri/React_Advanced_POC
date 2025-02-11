const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messages");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/sendMessage", authMiddleware, sendMessage);

router.get("/getMessages/:chatId", authMiddleware, getMessages);

module.exports = router;
