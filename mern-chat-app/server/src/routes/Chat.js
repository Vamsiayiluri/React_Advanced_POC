const express = require("express");
const authMiddleware = require("../middleware/auth");
const { createChat, getAllChats, getChatById } = require("../controllers/chat");

const router = express.Router();

router.post("/createChat", authMiddleware, createChat);

router.get("/getAllChats", authMiddleware, getAllChats);

router.get("/:chatId", authMiddleware, getChatById);

module.exports = router;
