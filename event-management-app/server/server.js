// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Event = require('./models/Event');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (adjust connection string as needed)
mongoose
  .connect('mongodb://localhost:27017/eventManagement')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ----- User Endpoints -----

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { name, email, password, dob, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const newUser = new User({ name, email, password, dob, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.password !== password) return res.status(400).json({ message: "Invalid credentials" });
    res.status(200).json({ message: "Login successful", user });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// ----- Event Endpoints -----

// Create event (organizer only)
app.post('/api/events', async (req, res) => {
  const { name, image, description, place, date, capacity, price, organizer } = req.body;
  try {
    const newEvent = new Event({ name, image, description, place, date, capacity, price, organizer });
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Get events with optional geospatial filtering (if lat/lng are provided)
app.get('/api/events', async (req, res) => {
  const { lat, lng } = req.query;
  try {
    let query = {};
    // For simplicity, if lat/lng are provided, filter events by place matching a nearby region.
    // In a production app, store coordinates for each event and use a geospatial query.
    if (lat && lng) {
      // Example: assume events have a "place" string we can filter on; otherwise, implement geospatial filtering.
      query.place = { $regex: req.query.location || '', $options: 'i' };
    }
    const events = await Event.find(query).populate('organizer');
    res.status(200).json(events);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Purchase ticket endpoint: add an attendee to an event
app.post('/api/events/:id/attend', async (req, res) => {
  const eventId = req.params.id;
  const { name, email, dob } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });
    event.attendees.push({ name, email, dob });
    await event.save();
    res.status(200).json({ message: "Ticket purchased successfully", event });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Analytics endpoint (aggregates attendee ages)
app.get('/api/analytics', async (req, res) => {
  try {
    const currentDate = new Date();
    const result = await Event.aggregate([
      { $unwind: "$attendees" },
      { $project: {
          age: {
            $floor: {
              $divide: [
                { $subtract: [ currentDate, "$attendees.dob" ] },
                1000 * 60 * 60 * 24 * 365
              ]
            }
          }
      }},
      { $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lt: ["$age", 18] }, then: "Under 18" },
                { case: { $and: [ { $gte: ["$age", 18] }, { $lte: ["$age", 25] } ] }, then: "18-25" },
                { case: { $and: [ { $gte: ["$age", 26] }, { $lte: ["$age", 35] } ] }, then: "26-35" },
                { case: { $and: [ { $gte: ["$age", 36] }, { $lte: ["$age", 50] } ] }, then: "36-50" },
              ],
              default: "50+"
            }
          },
          count: { $sum: 1 }
      }}
    ]);
    res.status(200).json(result);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
