// ./utils/otp.js
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import ErrorHandler from "../middlewares/error.js";
import { OTP } from "../models/otpSchema.js";

export const generateOtp = async (email) => {
  try {
    // Generate OTP
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const otpAlreadyExists = await OTP.findOne({ email: email });

    let otpDocument = null;
    if (otpAlreadyExists) {
      otpDocument = await otpAlreadyExists.updateOne({ otp: otp });
    }

    // Save OTP to database
    else {
      otpDocument = await OTP.create({ email: email, otp: otp });
    }
    if (!otpDocument) throw new ErrorHandler("OTP could not be created.", 400);

    // Send OTP to user's email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PW,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: "Your OTP for Charity Wallet.",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.log(error);
    throw new ErrorHandler("Email could not be sent.", 500);
  }
};

export const verifyOTP = async (email, otp) => {
  const storedOTP = await OTP.findOne({ email: email });

  if (!storedOTP) {
    return false; // OTP has expired or doesn't exist
  }

  const isVerified = otp === storedOTP.otp; // Verify the OTP

  if(isVerified) await OTP.deleteOne({email: email});

  return isVerified;
};
