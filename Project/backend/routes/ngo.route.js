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

// NOTE: Fields where alias is required, should have query param ngoAlias, e.g., '/dashboard?ngoAlias=sample_ngo'

// To get access to all the verified ngos on the website.
router.get("/", getNgos);

// For registering a new NGO, check ../middlewares/ngo.model.js for the fields that are required.
// An OTP is sent for the first request below. The OTP is verified in the confirm-registration path.
router.route("/register").post(registerNgo);
router.route("/confirm-registration").post(completeNgoRegistration);

// Enter email and password for logging in. A cookie is sent afterwards. More about cookie in ../utils.
router.route("/login").post(loginNgo);
router.get("/logout", isNgoLoggedIn, logoutNgo); // Logout function. Deletes the cookie if present.

// The dashboard of an NGO whose alias is given in the query of the URL.
// NOTE: ngoAlias is necessary in URL. example url: '/dashboard?ngoAlias=sample_ngo'
router.get("/dashboard", getNgoByAlias);

// Donate to the ngo whose alias is given in query, e.g., 'donate?ngoAlias=sample_ngo'
router.post("/donate", donateToNgo);

// Get campaigns for a particular ngo, whose alias is required in
router.get("/campaigns", getCampaigns);

// This routes will only work when the NGO is logged in. The routes will give the data according to the cookie
// stored on the client side.
router
  .route("/myNgo")
  .get(isNgoLoggedIn, getMyNgo)
  .put(isNgoLoggedIn, updateNgoProfile)
  .delete(isNgoLoggedIn, deleteNgo); // Careful while using this as all the images, and campaigns associated with the NGO will be deleted when this route is called.

// Adding a Campaign, updating it, or deleting it, all of it done here.
router.post("/myNgo/addCampaign", isNgoLoggedIn, addCampaign);
router.put("/myNgo/updateCampaign", isNgoLoggedIn, updateMyCampaign); // NOTE: Here, campaignAlias is required in the url query params.
router.delete("/myNgo/deleteCampaign", isNgoLoggedIn, deleteMyCampaign);

// Password changing related queries. OTP required for changing password.
router.post("/myNgo/changePassword", changePassword);
router.post("/myNgo/changePasswordConfirm", changePasswordConfirmation);

// Image handling for NGO.
router.post(
  "/myNgo/uploadLogo",
  isNgoLoggedIn,
  upload.single("logo"),
  uploadLogo
);
router.delete("/myNgo/logo", isNgoLoggedIn, deleteLogo);
router.get("/logo", getLogo); // Here as well, the query param, ngoAlias is required.
router.post(
  "/myNgo/gallery",
  isNgoLoggedIn,
  upload.array("gallery", 3),
  uploadGallery
);

router.get("/gallery", getGallery); // This function also required ngoAlias in the query params. It will send data as array of base64 strings which are to be converted by the frontend webpage script.

router.delete("/myNgo/gallery", isNgoLoggedIn, deleteGallery); // Here, in the body of the request, an array with field 'images' is required, and the images should be present on our database.

router.post(
  "/myNgo/campaign/uploadGallery", // NOTE: campaignAlias required in query params.
  upload.array("gallery", 3),
  isNgoLoggedIn,
  uploadCampaignCover
);
router.delete(
  "/myNgo/campaign/deleteGallery", // Same as deleting gallery in NGOs, but campaignAlias is required in the query params.
  isNgoLoggedIn,
  deleteCampaignCover
);

export default router;
