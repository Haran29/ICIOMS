// app.js

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

const Port = 8000;
app.listen(Port, () => console.log(`Server is running on port ${Port}`));
