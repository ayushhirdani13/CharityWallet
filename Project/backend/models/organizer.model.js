// ./models/organizer.model.js
import mongoose from "mongoose";

// Organizer Schema
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  password: {
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
