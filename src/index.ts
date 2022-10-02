import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import morgan from "morgan";

const port = process.env.PORT || 5000;
const host = process.env.HOST || "0.0.0.0";

// Initialize dotenv so we can use process.env
require("dotenv").config();

const app: any = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(compression());
app.set("trust proxy", true);

app.listen(port, host, () => {
  console.log(`🚀🚀🚀 Server launched at port ${port} 🚀🚀🚀`);
});
