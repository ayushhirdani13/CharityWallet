// ./models/ngo.model.js
import mongoose from "mongoose";

// NGO Schema
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  contactNo: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  alias: {
    type: String,
    unique: true,
  },
  licenseNo: {
    required: true,
    type: String,
  },
  dateOfReg: {
    required: true,
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  logo: {
    type: String,
    default: null,
  },
  gallery: {
    type: [String],
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
  campaigns: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Campaign",
  },
  donationsTillNow: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const NGO = mongoose.model("NGO", schema);
