const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());  // Allow JSON body parsing
app.use(cors());          // Enable CORS for frontend requests

mongoose.connect("mongodb://127.0.0.1:27017/hotel_booking")
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Booking Schema
const bookingSchema = new mongoose.Schema({
    name: String,
    email: String
});
const Booking = mongoose.model("Booking", bookingSchema);

// API Route to handle bookings
app.post("/api/bookings", async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: "All fields are required" });

    const newBooking = new Booking({ name, email });
    await newBooking.save();
    res.json({ message: "Booking successful!" });
});

// Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
