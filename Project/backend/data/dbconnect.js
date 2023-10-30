import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "charity-wallet",
    })
    .then(console.log("Database Connected"))
    .catch((error) => {
      console.log(error);
    });
};
