// server/models/Event.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendeeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date, required: true }
}, { _id: false });

const eventSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String }, // Can store a base64 image or URL
  description: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: Date, required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  attendees: [attendeeSchema]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
