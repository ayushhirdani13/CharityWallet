// ./routes/organizer.route.js
import express from "express";
import {
  addCampaign,
  changePassword,
  changePasswordConfirmation,
  confirmOrganizerRegistration,
  deleteCampaignCover,
  deleteMyCampaign,
  deleteOrganizer,
  getMyProfile,
  loginOrganizer,
  logoutOrganizer,
  registerOrganizer,
  updateMyCampaign,
  updateOrganizerProfile,
  uploadCampaignCover,
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

router.post(
  "/addCampaign",
  isOrganizerLoggedIn,
  upload.single("cover"),
  addCampaign
);
router.patch(
  "/updateCampaign",
  isOrganizerLoggedIn,
  upload.single("cover"),
  updateMyCampaign
);
router.delete("/deleteCampaign", isOrganizerLoggedIn, deleteMyCampaign);
router.post("/changePassword", changePassword);
router.post("/changePasswordConfirm", changePasswordConfirmation);
router.post(
  "/campaign/cover",
  upload.single("cover"),
  isOrganizerLoggedIn,
  uploadCampaignCover
);
router.delete("/campaign/cover", isOrganizerLoggedIn, deleteCampaignCover);

export default router;
