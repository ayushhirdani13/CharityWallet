// ./controllers/fundRaiser.controller.js
import ErrorHandler from "../middlewares/error.js";
import { FundRaiser } from "../models/fundraiser.model.js";
import { Donation } from "../models/donation.model.js";
import lodash from "lodash";

export const createFundRaiser = async (req, res, next) => {
  try {
    const data = req.body;

    const allowedFields = [
      "name",
      "title",
      "donationReq",
      "donationTillNow",
    ];
    const fundRaiserData = lodash.pick(data, allowedFields);

    const fundRaiser = await FundRaiser.create(fundRaiserData);

    if (!fundRaiser) return next(new ErrorHandler("Fund Raiser not created.", 400));

    res.status(201).json({
      success: true,
      fundRaiser,
    });
  } catch (error) {
    next(error);
  }
};

export const getFundRaisers = async (req, res, next) => {
  try {
    const fundRaisers = await FundRaiser.find().select("-_id");

    res.status(200).json({
      success: true,
      fundRaisers,
    });
  } catch (error) {
    next(error);
  }
};

export const getFundRaiserById = async (req, res, next) => {
  try {
    const fundRaiserId = req.params.id;

    const fundRaiser = await FundRaiser.findById(fundRaiserId).select("-_id");

    if (!fundRaiser) return next(new ErrorHandler("Fund Raiser not found.", 404));

    res.status(200).json({
      success: true,
      data: fundRaiser,
    });
  } catch (error) {
    next(error);
  }
};

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

export const deleteFundRaiser = async (req, res, next) => {
  try {
    const fundRaiserId = req.params.id;

    const deletedFundRaiser = await FundRaiser.findByIdAndDelete(fundRaiserId);

    if (!deletedFundRaiser) {
      return next(new ErrorHandler("Fund Raiser not found.", 404));
    }

    res.status(200).json({
      success: true,
      data: deletedFundRaiser,
    });
  } catch (error) {
    next(error);
  }
};

export const donate = async (req, res, next) => {
    
    try {
      const data = req.body;
  
      const fund = await FundRaiser.findOne({alias: req.params.alias});
  
      if (!fund) return next(new ErrorHandler("Fund raiser not found", 404));
  
      const donationData = {
        ...data,
        receiverType: "FundRaiser",
        receiverId: fund._id,
      };
  
      const donation = await Donation.create(donationData);
  
      if (!donation) return next(new ErrorHandler("Donation Unsuccessful.", 400));
  
      const updatedFundRaiser = await fund.updateOne(
        { donationTillNow: fund.donationTillNow + data.donationAmount }
        // { session }
      );
  
      if (!updatedFundRaiser)
        return next(new ErrorHandler("Update Unsuccessful.", 400));
  
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
