// ./routes/organizer.route.js
import express from "express";
import {
  addCampaign,
  changePassword,
  changePasswordConfirmation,
  completeOrganizerRegistration,
  deleteMyCampaign,
  deleteOrganizer,
  getMyProfile,
  loginOrganizer,
  registerOrganizer,
  updateMyCampaign,
  updateOrganizerProfile,
} from "../controllers/organizer.controller.js";
import { isOrganizerLoggedIn } from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(registerOrganizer);
router.route("/confirm-registration").post(completeOrganizerRegistration);
router.route("/login").post(loginOrganizer);
// router.get("/campaigns", getCampaigns);
router
  .route("/myProfile")
  .get(isOrganizerLoggedIn, getMyProfile)
  .put(isOrganizerLoggedIn, updateOrganizerProfile)
  .delete(isOrganizerLoggedIn, deleteOrganizer);

router.post("/addCampaign", isOrganizerLoggedIn, addCampaign);
router.put("/updateCampaign", isOrganizerLoggedIn, updateMyCampaign);
router.delete("/deleteCampaign", isOrganizerLoggedIn, deleteMyCampaign);
router.post("/changePassword", changePassword);
router.post("/changePasswordConfirm", changePasswordConfirmation);

export default router;
