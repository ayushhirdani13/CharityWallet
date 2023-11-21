// ./controllers/ngo.controller.js
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
  uploadGalleryCampaign,
} from "./campaign.controller.js";
import { generateOtp, verifyOTP } from "../utils/otp.js";
import { redisClient } from "../data/redisConnect.js";
import {
  deleteLogoGdrive,
  getGalleryFromGdrive,
  getLogoGdrive,
  updateLogoGdrive,
  uploadLogoGdrive,
  uploadMultipleImagesGdrive,
} from "../middlewares/imageHandler.js";
import fs from "fs";
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

    const generatedOtp = await generateOtp(ngo_form.email);

    if (!generatedOtp.success)
      return next(new ErrorHandler("OTP could not be generated.", 500));

    await redisClient.set(ngo_form.email, JSON.stringify(ngo_form));

    res.status(200).json({
      success: true,
      message: "Email for OTP sent to you.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const completeNgoRegistration = async (req, res, next) => {
  try {
    const data = req.body;

    const isVerified = await verifyOTP(data.email, data.otp);

    if (!isVerified)
      return next(new ErrorHandler("OTP Validation Failed.", 500));

    const ngo_form_string = await redisClient.get(data.email);

    if (!ngo_form_string) {
      return next(
        new ErrorHandler("Invalid email or registration data expired", 400)
      );
    }

    const ngo_form = JSON.parse(ngo_form_string);
    // console.log(ngo_form);

    const ngo = await NGO.create(ngo_form);
    sendNgoCookie(ngo, res, "NGO registered Successfully.", 200);

    await redisClient.del(data.email);
  } catch (error) {
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

    await deleteLogoGdrive(req.ngo.logo, next);
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

    if (!ngoAlias) {
      return next(
        new ErrorHandler("NGO alias is required in query string.", 400)
      );
    }

    const ngo = await NGO.findOne({ alias: ngoAlias })
      .populate({ path: "campaigns", model: Campaign })
      .select("-_id");

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
      campaigns: campaigns,
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

export const changePassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const ngo = await NGO.findOne({ email: email });

    if (!ngo) return next(new ErrorHandler("NGO Not Found!", 404));

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

    const ngo = await NGO.findOne({ email: data.email }).select("+password");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await ngo.updateOne({ password: hashedPassword });

    sendNgoCookie(ngo, res, "NGO Password Updated Successfully.", 200);
  } catch (error) {
    next(error);
  }
};

export const uploadLogo = async (req, res, next) => {
  try {
    const ngoId = req.ngo._id; // Obtain NGO ID for updation from the request modified in isLoggedIn
    let imgId;
    if (!req.ngo.logo) imgId = await uploadLogoGdrive(req.file, next);
    else imgId = await updateLogoGdrive(req.ngo.logo, req.file, next);
    const updateData = { logo: imgId };

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

export const getLogo = async (req, res, next) => {
  try {
    // Get the NGO alias and image name from the request parameters
    const ngoAlias = req.query.ngoAlias;

    const ngo = await NGO.findOne({ alias: ngoAlias });

    const imgPath = await getLogoGdrive(ngo.logo, next);
    res.sendFile(imgPath);

    res.on("finish", async () => {
      // Delete the file after it has been sent successfully
      await fs.promises.unlink(imgPath);
      // console.log(`File ${imgPath} has been deleted.`);
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLogo = async (req, res, next) => {
  try {
    const resp = await deleteLogoGdrive(req.ngo.logo, next);
    await NGO.findByIdAndUpdate(req.ngo._id, {
      $set: { logo: null },
    });

    res.status(resp.status);
  } catch (error) {
    next(error);
  }
};

export const uploadGallery = async (req, res, next) => {
  try {
    const gallery = await uploadMultipleImagesGdrive(req.files, next);

    const updatedNgo = await NGO.findByIdAndUpdate(
      req.ngo._id,
      { $push: { gallery: gallery } },
      {
        new: true,
      }
    );

    if (!updatedNgo) {
      return next(new ErrorHandler("Update Unsuccessful."));
    }

    res.status(201).json({
      success: true,
      message: "Gallery Updated Successful.",
      ngo: updatedNgo,
    });
  } catch (error) {
    next(error);
  }
};

export const getGallery = async (req, res, next) => {
  try {
    const ngo = await NGO.findOne({ alias: req.query.ngoAlias });
    const gallery = ngo.gallery;

    if (!gallery || gallery.length === 0) {
      return next(new ErrorHandler("Gallery is empty.", 404));
    }

    const images = await getGalleryFromGdrive(gallery, next);

    if (!images) return next(new ErrorHandler("Error getting images.", 402));

    // // Set the response content type to JPEG
    // res.type("image/jpeg");

    // for (const image of images) {
    //   res.write(image);
    //   // console.log("Image sent.");
    //   // await new Promise(resolve => setTimeout(resolve, 100));
    // }

    // res.end();

    // Convert each image buffer to base64
    const base64Images = images.map(image => image.toString('base64'));

    // Set the response content type to JSON
    res.type("application/json");

    // Send the images as a JSON array
    res.json({ gallery: base64Images });
  } catch (error) {
    next(error);
  }
};

export const uploadCampaignGallery = async (req, res, next) => {
  try {
    req.campaign = await Campaign.findOne({ alias: req.query.campaignAlias });
    await uploadGalleryCampaign(req, res, next);
  } catch (error) {
    next(error);
  }
};
