// ./models/fundraiser.model.js
import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  title: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
    enum: ["Medical", "Animal", "Other"],
  },
  description: {
    type: String,
    required: false,
  },
  donationReq: {
    type: Number,
    required: true,
  },
  donationTillNow: {
    type: Number,
    default: 0,
  },
  alias: {
    type: String,
    unique: true,
  },
  address: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
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

export const FundRaiser = mongoose.model("FundRaiser", schema);
