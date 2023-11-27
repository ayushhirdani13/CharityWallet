import { generateOtp, verifyOTP } from "../utils/otp.js";
import { Donation } from "../models/donation.model.js";
import ErrorHandler from "../middlewares/error.js";

export const enterDonorEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
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

export const verifyEmail = async (req, res, next) => {
  try {
    const data = req.body;

    const isVerified = await verifyOTP(data.email, data.otp);

    if (!isVerified)
      return next(new ErrorHandler("OTP Validation Failed.", 500));

    const donations = await Donation.find({ donorEmail: data.email });

    res.status(201).json({
      success: true,
      donations: donations,
    })
  } catch (error) {
    next(error);
  }
};
