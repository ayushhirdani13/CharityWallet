// ./routes/campaign.route.js
import express from "express";
import {
  getCampaignByAlias,
  getCampaigns,
  donateToCampaign,
} from "../controllers/campaign.controller.js";

const router = express.Router();

router.get("/", getCampaigns);
router.get("/:alias", getCampaignByAlias);
router.get("/donate", donateToCampaign);

export default router;