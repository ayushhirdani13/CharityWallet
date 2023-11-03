// ./models/organizer.model.js
import mongoose from "mongoose";

// Organizer Schema
const schema = new mongoose.Schema({
  organizerName: {
    type: String,
    required: true,
  },
  organizerEmail: {
    type: String,
    required: true,
  },
  organizerPhoneNo: {
    type: String,
    required: true,
  },
  organizerPassword: {
    type: String,
    select: false,
    required: true,
  },
  campaigns: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Campaign",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Organizer = mongoose.model("Organizer", schema);
