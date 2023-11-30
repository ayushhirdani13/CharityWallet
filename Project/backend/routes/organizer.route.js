// ./routes/organizer.route.js
import express from "express";
import {
  addCampaign,
  changePassword,
  changePasswordConfirmation,
  confirmOrganizerRegistration,
  deleteCampaignGallery,
  deleteMyCampaign,
  deleteOrganizer,
  getMyProfile,
  loginOrganizer,
  logoutOrganizer,
  registerOrganizer,
  updateMyCampaign,
  updateOrganizerProfile,
  uploadCampaignGallery,
} from "../controllers/organizer.controller.js";
import { isOrganizerLoggedIn } from "../middlewares/auth.js";
import { upload } from "../middlewares/imageHandler.js";
const router = express.Router();

router.route("/register").post(registerOrganizer);
router.route("/confirm-registration").post(confirmOrganizerRegistration);
router.route("/login").post(loginOrganizer);
router.get("/logout", isOrganizerLoggedIn, logoutOrganizer);

router
  .route("/myProfile")
  .get(isOrganizerLoggedIn, getMyProfile)
  .patch(isOrganizerLoggedIn, updateOrganizerProfile)
  .delete(isOrganizerLoggedIn, deleteOrganizer);

router.post("/addCampaign", isOrganizerLoggedIn, addCampaign);
router.patch("/updateCampaign", isOrganizerLoggedIn, updateMyCampaign);
router.delete("/deleteCampaign", isOrganizerLoggedIn, deleteMyCampaign);
router.post("/changePassword", changePassword);
router.post("/changePasswordConfirm", changePasswordConfirmation);
router.post(
  "/campaign/uploadGallery",
  upload.array("gallery", 3),
  isOrganizerLoggedIn,
  uploadCampaignGallery
);
router.delete(
  "/campaign/deleteGallery",
  isOrganizerLoggedIn,
  deleteCampaignGallery
);

export default router;
