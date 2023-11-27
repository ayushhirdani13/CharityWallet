// ./routes/ngo.route.js
import express from "express";
import {
  getNgos,
  registerNgo,
  loginNgo,
  getMyNgo,
  updateNgoProfile,
  deleteNgo,
  getNgoByAlias,
  donateToNgo,
  getCampaigns,
  addCampaign,
  updateMyCampaign,
  deleteMyCampaign,
  completeNgoRegistration,
  changePassword,
  changePasswordConfirmation,
  uploadLogo,
  getLogo,
  deleteLogo,
  uploadGallery,
  getGallery,
  uploadCampaignCover,
  deleteCampaignCover,
  deleteGallery,
  logoutNgo,
} from "../controllers/ngo.controller.js";
import { isNgoLoggedIn } from "../middlewares/auth.js";
import { upload } from "../middlewares/imageHandler.js";

const router = express.Router();

router.get("/", getNgos);

router.route("/register").post(registerNgo);
router.route("/confirm-registration").post(completeNgoRegistration);

router.route("/login").post(loginNgo);
router.get("/logout", isNgoLoggedIn, logoutNgo);

router.get("/dashboard", getNgoByAlias);
router.post("/donate", donateToNgo);

router.get("/campaigns", getCampaigns);

router
  .route("/myNgo")
  .get(isNgoLoggedIn, getMyNgo)
  .put(isNgoLoggedIn, updateNgoProfile)
  .delete(isNgoLoggedIn, deleteNgo);

router.post("/myNgo/addCampaign", isNgoLoggedIn, addCampaign);
router.put("/myNgo/updateCampaign", isNgoLoggedIn, updateMyCampaign);
router.delete("/myNgo/deleteCampaign", isNgoLoggedIn, deleteMyCampaign);
router.post("/myNgo/changePassword", changePassword);
router.post("/myNgo/changePasswordConfirm", changePasswordConfirmation);
router.post(
  "/myNgo/uploadLogo",
  isNgoLoggedIn,
  upload.single("logo"),
  uploadLogo
);
router.delete("/myNgo/logo", isNgoLoggedIn, deleteLogo);
router.get("/logo", getLogo);
router.post(
  "/myNgo/gallery",
  isNgoLoggedIn,
  upload.array("gallery", 3),
  uploadGallery
);

router.get("/gallery", getGallery);
router.delete("/myNgo/gallery", isNgoLoggedIn, deleteGallery);
router.post(
  "/myNgo/campaign/uploadGallery",
  upload.array("gallery", 3),
  isNgoLoggedIn,
  uploadCampaignCover
);
router.delete(
  "/myNgo/campaign/deleteGallery",
  isNgoLoggedIn,
  deleteCampaignCover
);

export default router;
