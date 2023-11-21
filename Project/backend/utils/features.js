// ./utils/features.js
import jwt from "jsonwebtoken";

export const sendNgoCookie = (ngo, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: ngo._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("ngoToken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    //   sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    //   secure: process.env.NODE_ENV === "Development" ? false : true,
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
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    //   sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    //   secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
export const sendFundRaiserCookieCookie = (fr, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: fr._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("frToken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    //   sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    //   secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};