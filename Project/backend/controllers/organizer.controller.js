// ./controllers/organizer.controller.js
import bcrypt from "bcrypt";
import { Organizer } from "../models/organizer.model.js";
import { deleteCampaign, updateCampaign } from "./campaign.controller.js";
import { Campaign } from "../models/campaign.model.js";
import ErrorHandler from "../middlewares/error.js";
import { generateOtp } from "../utils/otp.js";
import { sendOrganizerCookie } from "../utils/features.js";

export const registerOrganizer = async (req, res, next) => {
  try {
    const organizerForm = req.body;

    const alreadyExistingOrganizer = await Organizer.findOne({
      $or: [
        { email: organizerForm.email },
        { contactNo: organizerForm.contactNo },
      ],
    });
    if (alreadyExistingOrganizer) {
      return next(
        new ErrorHandler(
          "Organizer already exists with the same email or contact No.",
          400
        )
      );
    }

    // The following part will be used in later version if we allow our users to know more about Organizers of the Campaign.
    /*
    let alias = organizerForm.name.toLowerCase().replace(/ /g, "_");
        let newAlias = alias;
        let counter = 1;
    
        while (
          await Organizer.findOne({ alias: new RegExp("^" + newAlias + "$", "i") })
        ) {
          newAlias = alias + "-" + counter;
          counter++;
        }
    
        // Add the alias to the NGO model
        organizerForm.alias = newAlias;
    */

    let hashedPassword = await bcrypt.hash(organizerForm.password, 10);
    organizerForm.password = hashedPassword;

    const generatedOtp = await generateOtp(organizerForm.email);

    if (!generatedOtp.success)
      return next(new ErrorHandler("OTP could not be generated.", 500));

    await redisClient.set(organizerForm.email, JSON.stringify(organizerForm));

    res.status(200).json({
      success: true,
      message: "Email for OTP sent to you.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const completeOrganizerRegistration = async (req, res, next) => {
  try {
    const data = req.body;

    const isVerified = await verifyOTP(data.email, data.otp);

    if (!isVerified)
      return next(new ErrorHandler("OTP Validation Failed.", 500));

    const organizerFormString = await redisClient.get(data.email);

    if (!organizerFormString) {
      return next(
        new ErrorHandler("Invalid email or registration data expired", 400)
      );
    }

    const organizerForm = JSON.parse(organizerFormString);
    // console.log(ngo_form);

    const organizer = await Organizer.create(organizerForm);
    sendOrganizerCookie(
      organizer,
      res,
      "Organizer registered Successfully.",
      200
    );

    await redisClient.del(data.email);
  } catch (error) {
    next(error);
  }
};

export const loginOrganizer = async (req, res, next) => {
  try {
    const organizer = await Organizer.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!organizer)
      return next(new ErrorHandler("Invalid email or password.", 400));

    const isMatch = await bcrypt.compare(req.body.password, organizer.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password.", 400));
    }

    sendNgoCookie(organizer, res, `Welcome Back, ${organizer.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      organizer: req.organizer,
    });
  } catch (err) {
    next(err);
  }
};

export const updateOrganizerProfile = async (req, res, next) => {
  try {
    const organizerId = req.organizer._id; // Obtain Organizer ID for updation from the request modified in isOrganizerLoggedIn
    const updateData = req.body;

    // Find the Organizer by id and update it with the new data
    const updatedOrganizer = await Organizer.findByIdAndUpdate(
      organizerId,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedOrganizer) {
      return next(new ErrorHandler("Update Unsuccessful.", 400));
    }

    res.status(200).json({
      success: true,
      message: "Organizer profile updated successfully",
      data: updatedOrganizer,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteOrganizer = async (req, res, next) => {
  try {
    const organizerId = req.ngo._id;

    const deletedOrganizer = await Organizer.findByIdAndDelete(organizerId);

    if (!deletedOrganizer) {
      return next(new ErrorHandler("Organizer not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "Organizer deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addCampaign = async (req, res, next) => {
  try {
    req.organizerId = req.organizer._id;
    req.organizerType = "Organizer";
    const campaign = await registerCampaign(req, res, next);

    const updatedOrganizer = await Organizer.findByIdAndUpdate(
      req.organizer._id,
      { $push: { campaigns: campaign._id } },
      { new: true }
    );

    if (!updatedOrganizer)
      return next(new ErrorHandler("Update Unsuccessful.", 400));

    res.status(201).json({
      success: true,
      message: "Campaign Added Successfully",
      data: updatedOrganizer,
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

    const campaign = await Campaign.findOne({ alias: campaignAlias });

    if (!campaign) return next(new ErrorHandler("Campaign Not Found.", 401));

    if (campaign.organizerId !== req.organizer._id)
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

    if (campaign.organizerId !== req.organizer._id)
      return next(
        new ErrorHandler("Unauthorized Access to the Campaign.", 403)
      );

    req.campaign = campaign;

    const deletedCampaign = await deleteCampaign(req, res, next);

    if (!deletedCampaign) {
      return next(new ErrorHandler("Campaign could not be deleted", 400));
    }

    const updatedOrganizer = await Organizer.updateOne(
      { _id: req.organizer._id },
      { $pull: { campaigns: req.campaign._id } }
    );

    res.status(200).json({
      success: true,
      message: "Campaign deleted successfully.",
      data: updatedOrganizer,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const organizer = await Organizer.findOne({ email: email });

    if (!organizer) return next(new ErrorHandler("Organizer Not Found!", 404));

    const generatedOtp = await generateOtp(email);
    if (!generatedOtp.success)
      return next(new ErrorHandler("OTP could not be generated.", 500));

    res.status(200).json({
      success: true,
      message: "Email for OTP sent to you.",
    });
  } catch (error) {
    next(error);
  }
};

export const changePasswordConfirmation = async (req, res, next) => {
  try {
    const data = req.body;

    const isVerified = await verifyOTP(data.email, data.otp);

    if (!isVerified)
      return next(new ErrorHandler("OTP Validation Failed.", 500));

    const organizer = await Organizer.findOne({ email: data.email }).select(
      "+password"
    );

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await organizer.updateOne({ password: hashedPassword });

    sendNgoCookie(
      organizer,
      res,
      "Organizer Password Updated Successfully.",
      200
    );
  } catch (error) {
    next(error);
  }
};
