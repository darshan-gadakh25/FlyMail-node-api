import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./src/app.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`FlyMail server running on port ${PORT}`);
});
