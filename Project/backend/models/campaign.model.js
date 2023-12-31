// ./models/campaign.model.js
import mongoose from "mongoose";

// Campaign Schema
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  organizerType: {
    type: String,
    enum: ["NGO", "Organizer"],
    required: true,
  },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: function () {
      if (organizerType === "Organizer") return "Organizer";
      if (organizerType === "NGO") return "NGO";
    },
    required: true,
  },
  alias: {
    type: String,
    unique: true,
  },
  cover: {
    type: String,
    required: false,
  },
  donationsTillNow: {
    type: Number,
    default: 0,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Campaign = mongoose.model("Campaign", schema);
