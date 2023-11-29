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
  logoutFr,
} from "../controllers/fundraiser.controller.js";
import { isFundRaiserLoggedIn } from "../middlewares/auth.js";

const router = express.Router();

// Get all the verified fundraisers on our DB
router.get("/", getFundRaisers);

// donate to the FundRaiser, whose frAlias is required in URL query param.
router.get("/donate", donateToFr);

// Open a Fundraiser and get its details, frAlias is required here as well.
router.get("/dashboard", getFundRaiserByAlias);

// Register a new Fundraiser, check FundRaiser.model.js for the fields to be added in the form body.
router.post("/register", registerFundraiser);
router.post("/completeRegistration", completeFrRegistration); // OTP validation required here as well.


// Enter Email and Password for Logging IN.
router.post("/login", loginFr);
router.get("/logout", logoutFr); // On Logout, frToken cookie will be deleted.

router
  .route("/myFundRaiser")
  .get(isFundRaiserLoggedIn, getMyFr)
  .delete(isFundRaiserLoggedIn, deleteFundRaiser);

export default router;
