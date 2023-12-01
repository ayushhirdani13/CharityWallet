// app.js
import express from "express";
import ngoRouter from "./routes/ngo.route.js";
import campaignRouter from "./routes/campaign.route.js";
import organizerRouter from "./routes/organizer.route.js";
import fundraiserRouter from "./routes/fundraiser.route.js";
import donorRouter from "./routes/donor.route.js";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { createClient } from "redis";
import { isRedisConnected } from "./data/redisConnect.js";
import cors from "cors";
import path from "path";
import { gdriveConnect } from "./data/gdriveConnect.js";

export const app = express();

config();

// Connecting to Google Drive API
export const drive = await gdriveConnect();

// Starting mongoose and redis clients
export const redisClient = await createClient({ url: process.env.REDIS_URI })
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();
await isRedisConnected(redisClient);

// Using MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.resolve() + "uploads"));

// Using /routes
// Each Router has its routes described in the files in ./routes directory. Check them if you want to know more about it.
app.use("/ngo", ngoRouter);
app.use("/campaign", campaignRouter);
app.use("/organizer", organizerRouter);
app.use("/fundraiser", fundraiserRouter);
app.use("/donor", donorRouter);

app.get("/", (req, res) => {
  res.send("Server Working Fine.");
});

// Using Error Middleware
app.use(errorMiddleware);
