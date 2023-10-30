import express from "express";
import ngoRouter from "./routes/ngo.route.js";
import campaignRouter from "./routes/campaign.route.js";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

export const app = express();

config({
  path: "./data/config.env",
});

// Using MiddleWares
app.use(express.json());
app.use(cookieParser());

// Using /Routers
app.use("/ngo", ngoRouter);
app.use("/campaign", campaignRouter);

app.get("/", (req, res) => {
  res.send("Server Working Nice.");
});

// Using Error Middleware
app.use(errorMiddleware);
