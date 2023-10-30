import { NGO } from "../models/ngo.model.js";
import { Organizer } from "../models/organizer.model.js";
import jwt from "jsonwebtoken";

export const isNgoLoggedIn = async (req, res, next) => {
  const { ngoToken } = req.cookies;

  if (!ngoToken)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });

  try {
    const decoded = jwt.verify(ngoToken, process.env.JWT_SECRET);
    req.ngo = await NGO.findById(decoded._id);
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export const isOrganizerLoggedIn = async (req, res, next) => {
  const { organizerToken } = req.cookies;

  if (!organizerToken)
    return res.status(404).json({
      success: false,
      message: "Login First",
    });

  try {
    const decoded = jwt.verify(organizerToken, process.env.JWT_SECRET);
    req.organizer = await Organizer.findById(decoded._id);
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};
