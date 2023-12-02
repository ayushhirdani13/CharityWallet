import express from "express";
import { NGO } from "../models/ngo.model.js";
import { Campaign } from "../models/campaign.model.js";
import { FundRaiser } from "../models/fundraiser.model.js";

const router = express.Router();

router.get("/current", async (req, res, next) => {
  try {
    const ngo = await NGO.findOne({})
      .sort({ donationsTillNow: -1 }) // Sort in descending order
      .limit(1);

    const campaign = await Campaign.findOne({})
      .sort({ donationsTillNow: -1 })
      .limit(1);
    const fundraiser = await FundRaiser.findOne({})
      .sort({ donationsTillNow: -1 })
      .limit(1);

    res.status(200).json({
      success: true,
      ngo: ngo,
      campaign: campaign,
      fundraiser: fundraiser,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
