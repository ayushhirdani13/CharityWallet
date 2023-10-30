import ErrorHandler from "../middlewares/error.js";
import { Campaign } from "../models/campaign.model.js";
import { Donation } from "../models/donation.model.js";
import lodash from "lodash";

export const registerCampaign = async (req, res, next) => {
  try {
    const data = req.body;

    const allowedFields = [
      "title",
      "vision",
      "alias",
      "images",
    ];
    const campaignData = lodash.pick(data, allowedFields);
    
    let alias = data.title.toLowerCase().replace(/ /g, "_");
    let newAlias = alias;
    let counter = 1;
    
    while (
      await Campaign.findOne({ alias: new RegExp("^" + newAlias + "$", "i") })
      ) {
        newAlias = alias + "-" + counter;
        counter++;
      }
      
      // Add the alias to the Campaign model
      campaignData.alias = newAlias;
      campaignData.organizerId = req.organizer;
      campaignData.organizerType = req.organizerType;
      // console.log(campaignData);

    const campaign = await Campaign.create(campaignData);

    if (!campaign) return next(new ErrorHandler("Campaign not Created.", 400));

    return campaign;
  } catch (error) {
    next(error);
  }
};

export const getCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find({ verified: true }).select("-_id");

    res.status(200).json({
      success: true,
      campaigns,
    });
  } catch (error) {
    next(error);
  }
};

export const getCampaignByAlias = async (req, res, next) => {
  try {
    const campaignAlias = req.params.alias;

    const campaign = await Campaign.findOne({ alias: campaignAlias }).select("-_id");

    if (!campaign) return next(new ErrorHandler("Campaign not found.", 404));

    res.status(200).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCampaign = async (req, res, next) => {
  try {
    const campaignId = req.campaign._id;
    const data = req.body;

    const allowedFields = ["vision", "images"];

    const updateData = lodash.pick(data, allowedFields);
    // console.log(updateData);

    // Find the NGO by id and update it with the new data
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaignId,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedCampaign) {
      return next(new ErrorHandler("Campaign not found.", 404));
    }

    return updatedCampaign;
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteCampaign = async (req, res, next) => {
  try {
    const campaignId = req.campaign._id;

    const deletedCampaign = await Campaign.findByIdAndDelete(campaignId);

    if (!deletedCampaign) {
      return next(new ErrorHandler("Campaign not found.", 404));
    }

    return deletedCampaign;
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const donateToCampaign = async (req, res, next) => {
  // Here, I have not used transaction for development purpose.
  // We can use transactions while testing and deployment phase.
  // When deploying, we will use transactions for updating database.
  // const session = await mongoose.startSession();
  // session.startTransaction();
  try {
    const data = req.body;

    const campaign = await Campaign.findOne({alias: req.params.alias});

    if (!campaign) return next(new ErrorHandler("Campaign not found", 404));

    const donationData = {
      ...data,
      receiverType: "Campaign",
      receiverId: campaign._id,
    };

    // const donation = await Donation.create([donationData], { session });
    const donation = await Donation.create(donationData);

    if (!donation) return next(new ErrorHandler("Donation Unsuccessful.", 400));

    const updatedCampaign = await campaign.updateOne(
      { donationsTillNow: Campaign.donationsTillNow + data.donationAmount }
      // { session }
    );

    if (!updatedCampaign)
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
