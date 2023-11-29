import express from "express";
import { enterDonorEmail, verifyEmail } from "../controllers/donor.controller.js";

const router = express.Router();

router.post("/enter", enterDonorEmail);
router.post("/verifyDonor", verifyEmail);

export default router;
