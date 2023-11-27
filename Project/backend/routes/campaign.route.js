// ./routes/campaign.route.js
import express from "express";
import {
  getCampaignByAlias,
  getCampaigns,
  donateToCampaign,
  getCoverCampaign,
} from "../controllers/campaign.controller.js";

const router = express.Router();

router.get("/", getCampaigns);
router.get("/dashboard", getCampaignByAlias);
router.get("/donate", donateToCampaign);
router.get("/cover", getCoverCampaign);

export default router;
