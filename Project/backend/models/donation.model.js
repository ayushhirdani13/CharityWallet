// ./models/donation.model.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Donation Schema
const schema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
  },
  donorEmail: {
    type: String,
    required: true,
  },
  donorPhoneNo: {
    type: String,
    required: true,
  },
  donationAmount: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  receiverType: {
    type: String,
    required: true,
    enum: ["NGO", "FundRaiser", "Campaign"],
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: function () {
      if (this.receiverType === "NGO") return "NGO";
      if (this.receiverType === "FundRaiser") return "FundRaiser";
      if (this.receiverType === "Campaign") return "Campaign";
    },
    required: true,
  },
  transactionId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  donationTime: {
    type: Date,
    default: Date.now,
  },
});

export const Donation = mongoose.model("Donation", schema);
