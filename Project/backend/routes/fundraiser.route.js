// ./routes/fundraiser.route.js
import express from "express";
import {
  getFundRaiserById,
  getFundRaiser,
  donate,
} from "../controllers/fundraiser.controller.js";

const router = express.Router();

router.get("/", getFundRaiser);
router.get("/:alias", getFundRaiserById);
router.get("/donate", donate);

export default router;