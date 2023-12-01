// ./controllers/fundRaiser.controller.js
import ErrorHandler from "../middlewares/error.js";
import bcrypt from "bcrypt";
import { FundRaiser } from "../models/fundraiser.model.js";
import { Donation } from "../models/donation.model.js";
import { generateOtp, verifyOTP } from "../utils/otp.js";
import { sendFundRaiserCookieCookie, sendEmail } from "../utils/features.js";
import { redisClient } from "../app.js";
import mongoose from "mongoose";

export const registerFundraiser = async (req, res, next) => {
  try {
    const fr_form = req.body;

    const alreadyExistingFundraiser = await FundRaiser.findOne({
      $or: [{ email: fr_form.email }, { contactNo: fr_form.contactNo }],
    });
    if (alreadyExistingFundraiser) {
      return next(
        new ErrorHandler(
          "FundRaiser already exists with the same email or contact number.",
          400
        )
      );
    }
    let alias = fr_form.name.toLowerCase().replace(/ /g, "_");
    let newAlias = alias;
    let counter = 1;

    while (
      await FundRaiser.findOne({ alias: new RegExp("^" + newAlias + "$", "i") })
    ) {
      newAlias = alias + "-" + counter;
      counter++;
    }

    // Add the alias to the NGO model
    fr_form.alias = newAlias;

    let hashedPassword = await bcrypt.hash(fr_form.password, 10);
    fr_form.password = hashedPassword;

    const generatedOtp = await generateOtp(fr_form.email);

    if (!generatedOtp.success)
      return next(new ErrorHandler("OTP could not be generated.", 500));

    await redisClient.set(fr_form.email, JSON.stringify(fr_form));

    res.status(200).json({
      success: true,
      message: "Email for OTP sent to you.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const completeFrRegistration = async (req, res, next) => {
  try {
    const data = req.body;

    const isVerified = await verifyOTP(data.email, data.otp);

    if (!isVerified)
      return next(new ErrorHandler("OTP Validation Failed.", 500));

    const fr_form_string = await redisClient.get(data.email);

    if (!fr_form_string) {
      return next(
        new ErrorHandler("Invalid email or registration data expired", 400)
      );
    }

    const fr_form = JSON.parse(fr_form_string);
    // console.log(ngo_form);

    const fr = await FundRaiser.create(fr_form);
    sendFundRaiserCookieCookie(
      fr,
      res,
      "FundRaiser registered Successfully.",
      200
    );

    await redisClient.del(data.email);
  } catch (error) {
    next(error);
  }
};

export const loginFr = async (req, res, next) => {
  try {
    const fr = await FundRaiser.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!fr) return next(new ErrorHandler("Invalid email or password.", 400));

    const isMatch = await bcrypt.compare(req.body.password, fr.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password.", 400));
    }

    sendFundRaiserCookieCookie(fr, res, `Welcome Back, ${fr.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getMyFr = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      fr: req.fr,
    });
  } catch (err) {
    next(err);
  }
};

export const logoutFr = async (req, res, next) => {
  res.status(200).clearCookie("frToken").json({
    success: true,
    message: "Logged Out Successfully.",
  });
};

export const getFundRaisers = async (req, res, next) => {
  try {
    const fundRaisers = await FundRaiser.find({ verified: true }).select(
      "-_id"
    );

    res.status(200).json({
      success: true,
      fundRaisers,
    });
  } catch (error) {
    next(error);
  }
};

export const getFundRaiserByAlias = async (req, res, next) => {
  try {
    const frAlias = req.query.frAlias;

    const fundRaiser = await FundRaiser.findOne({ alias: frAlias }).select(
      "-_id"
    );

    if (!fundRaiser)
      return next(new ErrorHandler("Fund Raiser not found.", 404));

    res.status(200).json({
      success: true,
      data: fundRaiser,
    });
  } catch (error) {
    next(error);
  }
};

/*
export const updateFundRaiser = async (req, res, next) => {
  try {
    const fundRaiserId = req.params.id;
    const data = req.body;

    const allowedFields = ["name", "title", "donationReq"];

    const updateData = lodash.pick(data, allowedFields);

    const updatedFundRaiser = await FundRaiser.findByIdAndUpdate(
      fundRaiserId,
      updateData,
      { new: true }
    );

    if (!updatedFundRaiser) {
      return next(new ErrorHandler("Fund Raiser not found.", 404));
    }

    res.status(200).json({
      success: true,
      data: updatedFundRaiser,
    });
  } catch (error) {
    next(error);
  }
};
*/

export const deleteFundRaiser = async (req, res, next) => {
  try {
    const frId = req.fr._id;

    const deletedFundRaiser = await FundRaiser.findByIdAndDelete(frId);

    if (!deletedFundRaiser) {
      return next(new ErrorHandler("Fund Raiser not found.", 404));
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const donateToFr = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const data = req.body;

    const fr = await FundRaiser.findOne({ alias: req.params.alias });

    if (!fr) return next(new ErrorHandler("Fund raiser not found", 404));
    if (!fr.verified) {
      await session.abortTransaction();
      session.endSession();
      return next(new ErrorHandler("FundRaiser is not verified yet.", 403));
    }

    const donationData = {
      ...data,
      receiverType: "FundRaiser",
      receiverId: fr._id,
    };

    const donation = await Donation.create(donationData);

    if (!donation) return next(new ErrorHandler("Donation Unsuccessful.", 400));

    const updatedFundRaiser = await fr.updateOne(
      { donationTillNow: fr.donationTillNow + data.donationAmount },
      { session }
    );

    if (!updatedFundRaiser)
      return next(new ErrorHandler("Update Unsuccessful.", 400));

    await session.commitTransaction();
    session.endSession();

    message =
      "Thanks for your donation. This is a confirmation mail that your donation was successful.";
    await sendEmail(data.email, `Donation to ${fr.title}`, message);

    res.status(201).json({
      success: true,
      message: "Donation made successfully.",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const fr = await FundRaiser.findOne({ email: email });

    if (!fr) return next(new ErrorHandler("FundRaiser Not Found!", 404));

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

    const fr = await FundRaiser.findOne({ email: data.email }).select(
      "+password"
    );

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await fr.updateOne({ password: hashedPassword });

    sendNgoCookie(fr, res, "FundRaiser Password Updated Successfully.", 200);
  } catch (error) {
    next(error);
  }
};
