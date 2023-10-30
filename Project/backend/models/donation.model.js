import mongoose from "mongoose";

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
      if (this.receiverType === "Fundraiser") return "FundRaiser";
      if (this.receiverType === "Campaign") return "Campaign";
    },
    required: true,
  },
  donationTime: {
    type: Date,
    default: Date.now,
  },
});

export const Donation = mongoose.model("Donation", schema);
