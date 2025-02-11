const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(express.json());
app.use(cors());

require("./config/db")();

app.get("/", (req, res) => {
  res.send("Welcome to the To-Do List API");
});

app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
