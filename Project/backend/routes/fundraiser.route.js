// ./routes/fundraiser.route.js
import express from "express";
import {
  getFundRaisers,
  getFundRaiserByAlias,
  donateToFr,
  registerFundraiser,
  completeFrRegistration,
  loginFr,
  getMyFr,
  deleteFundRaiser,
} from "../controllers/fundraiser.controller.js";
import { isFundRaiserLoggedIn } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getFundRaisers);
router.get("/donate", donateToFr);
router.get("/dashboard", getFundRaiserByAlias);

router.post("/register", registerFundraiser);
router.post("/completeRegistration", completeFrRegistration);

router.post("/login", loginFr);

router
  .route("/myFundRaiser")
  .get(isFundRaiserLoggedIn, getMyFr)
  .delete(isFundRaiserLoggedIn, deleteFundRaiser);

export default router;
