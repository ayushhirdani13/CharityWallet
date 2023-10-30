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
} from "../controllers/ngo.controller.js";
import { isNgoLoggedIn } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getNgos);
router.route("/register").post(registerNgo);
router.route("/login").post(loginNgo);
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

export default router;
