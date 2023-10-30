// The controllers for the NGO routes
import bcrypt from "bcrypt";
import ErrorHandler from "../middlewares/error.js";
import { sendNgoCookie } from "../utils/features.js";
import { NGO } from "../models/ngo.model.js";
import { Donation } from "../models/donation.model.js";
import { Campaign } from "../models/campaign.model.js";
import {
  deleteCampaign,
  registerCampaign,
  updateCampaign,
} from "./campaign.controller.js";
// import mongoose from "mongoose";

export const getNgos = async (req, res, next) => {
  try {
    const ngos = await NGO.find({ verified: true });

    res.status(200).json({
      success: true,
      ngos,
    });
  } catch (error) {
    next(error);
  }
};

export const registerNgo = async (req, res, next) => {
  try {
    const ngo_form = req.body;

    const alreadyExistingNgo = await NGO.findOne({
      $or: [
        { email: ngo_form.email },
        { contactNo: ngo_form.contactNo },
        { licenseNo: ngo_form.licenseNo },
      ],
    });
    if (alreadyExistingNgo) {
      return next(
        new ErrorHandler(
          "NGO already exists with the same email, contact No. or license No.",
          400
        )
      );
    }
    let alias = ngo_form.name.toLowerCase().replace(/ /g, "_");
    let newAlias = alias;
    let counter = 1;

    while (
      await NGO.findOne({ alias: new RegExp("^" + newAlias + "$", "i") })
    ) {
      newAlias = alias + "-" + counter;
      counter++;
    }

    // Add the alias to the NGO model
    ngo_form.alias = newAlias;

    let hashedPassword = await bcrypt.hash(ngo_form.password, 10);
    ngo_form.password = hashedPassword;

    const ngo = await NGO.create(ngo_form);

    sendNgoCookie(ngo, res, "NGO registered Successfully.", 200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const loginNgo = async (req, res, next) => {
  try {
    const ngo = await NGO.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!ngo) return next(new ErrorHandler("Invalid email or password.", 400));

    const isMatch = await bcrypt.compare(req.body.password, ngo.password);

    if (!isMatch) {
      if (!ngo)
        return next(new ErrorHandler("Invalid email or password.", 400));
    }

    sendNgoCookie(ngo, res, `Welcome Back, ${ngo.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getMyNgo = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      ngo: req.ngo,
    });
  } catch (err) {
    next(err);
  }
};

export const updateNgoProfile = async (req, res, next) => {
  try {
    const ngoId = req.ngo._id; // Obtain NGO ID for updation from the request modified in isLoggedIn
    const updateData = req.body;

    // Find the NGO by id and update it with the new data
    const updatedNgo = await NGO.findByIdAndUpdate(ngoId, updateData, {
      new: true,
    });

    if (!updatedNgo) {
      return next(new ErrorHandler("Update Unsuccessful.", 400));
    }

    res.status(200).json({
      success: true,
      message: "NGO profile updated successfully",
      data: updatedNgo,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteNgo = async (req, res, next) => {
  try {
    const ngoId = req.ngo._id;

    const deletedNgo = await NGO.findByIdAndDelete(ngoId);

    if (!deletedNgo) {
      return next(new ErrorHandler("NGO not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "NGO deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getNgoByAlias = async (req, res, next) => {
  try {
    const ngoAlias = req.query.alias;

    const ngo = await NGO.findOne({ alias: ngoAlias }).select("-_id");

    if (!ngo) return next(new ErrorHandler("NGO not found.", 404));

    res.status(200).json({
      success: true,
      data: ngo,
    });
  } catch (error) {
    next(error);
  }
};

export const donateToNgo = async (req, res, next) => {
  // Here, I have not used transaction for development purpose.
  // When deploying, we will use transactions for updating database.
  // const session = await mongoose.startSession();
  // session.startTransaction();
  try {
    const data = req.body;

    const ngo = await NGO.findOne(req.query);

    if (!ngo) return next(new ErrorHandler("NGO not found", 404));

    const donationData = {
      ...data,
      receiverType: "NGO",
      receiverId: ngo._id,
    };

    // const donation = await Donation.create([donationData], { session });
    const donation = await Donation.create(donationData);

    if (!donation) return next(new ErrorHandler("Donation Unsuccessful.", 400));

    const updatedNgo = await ngo.updateOne(
      { donationsTillNow: ngo.donationsTillNow + data.donationAmount }
      // { session }
    );

    if (!updatedNgo) return next(new ErrorHandler("Update Unsuccessful.", 400));

    // await session.commitTransaction();
    // session.endSession();

    res.status(201).json({
      success: true,
      message: "Donation made successfully.",
    });
  } catch (error) {
    // await session.abortTransaction();
    // session.endSession();
    next(error);
  }
};

export const getCampaigns = async (req, res, next) => {
  const ngoAlias = req.query.alias; // Replace with actual parameter name if different

  try {
    const ngo = await NGO.findOne({ alias: ngoAlias });
    const campaigns = await Campaign.find({ organizer: ngo._id });
    res.status(200).json({
      success: true,
      campaigns,
    });
  } catch (err) {
    next(err);
  }
};

export const addCampaign = async (req, res, next) => {
  try {
    req.organizer = req.ngo._id;
    req.organizerType = "NGO";
    const campaign = await registerCampaign(req, res, next);

    const updatedNGO = await NGO.findByIdAndUpdate(
      req.ngo._id,
      { $push: { campaigns: campaign._id } },
      { new: true }
    );

    if (!updatedNGO) return next(new ErrorHandler("Update Unsuccessful.", 400));

    res.status(201).json({
      success: true,
      ngo: updatedNGO,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(new ErrorHandler("Validation Error", 400));
    }
    next(error);
  }
};

export const updateMyCampaign = async (req, res, next) => {
  try {
    const campaignAlias = req.query.campaignAlias;

    if (!campaignAlias)
      return next(new ErrorHandler("No Alias found in URL", 400));

    const campaign = await Campaign.findOne({ alias: campaignAlias });

    if (!campaign) return next(new ErrorHandler("Campaign Not Found.", 401));

    if (campaign.organizerId.toString() !== req.ngo._id.toString())
      return next(
        new ErrorHandler("This Campaign is not associated with your NGO.", 403)
      );

    req.campaign = campaign;

    const updatedCampaign = await updateCampaign(req, res, next);

    res.status(200).json({
      success: true,
      message: "Campaign updated successfully.",
      data: updatedCampaign,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMyCampaign = async (req, res, next) => {
  try {
    const campaignAlias = req.query.campaignAlias;

    const campaign = await Campaign.findOne({ alias: campaignAlias });

    if (!campaign) return next(new ErrorHandler("Campaign Not Found.", 404));

    if (campaign.organizerId.toString() !== req.ngo._id.toString())
      return next(
        new ErrorHandler("Unauthorized Access to the Campaign.", 403)
      );

    req.campaign = campaign;

    const deletedCampaign = await deleteCampaign(req, res, next);

    if (!deletedCampaign) {
      return next(new ErrorHandler("Campaign could not be deleted", 400));
    }

    const updatedNGO = await NGO.updateOne(
      { _id: req.ngo._id },
      { $pull: { campaigns: req.campaign._id } }
    );

    if (!updatedNGO)
      return next(new ErrorHandler("Campaign could not be deleted.", 400));

    res.status(200).json({
      success: true,
      message: "Campaign deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
