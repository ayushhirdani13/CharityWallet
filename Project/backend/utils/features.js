// ./utils/features.js
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error.js";
import nodemailer from "nodemailer";

export const sendNgoCookie = (ngo, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: ngo._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("ngoToken", token, {
      httpOnly: false,
      maxAge: 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};

export const sendOrganizerCookie = (ngo, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: ngo._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("organizerToken", token, {
      httpOnly: false,
      maxAge: 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
export const sendFundRaiserCookie = (
  fr,
  res,
  message,
  statusCode = 200
) => {
  const token = jwt.sign({ _id: fr._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("frToken", token, {
      httpOnly: false,
      maxAge: 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};

export const sendEmail = async (email, subject, message) => {
  try {
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
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new ErrorHandler("Could not send email.", 500);
  }
};
