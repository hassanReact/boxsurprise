import express, { Request, Response } from "express";
import dotenv from "dotenv";
import * as Sentry from "@sentry/node";
import dbConnect from "./config/db";
import authRoutes from './routes/auth.route'
import withdrawRoutes from './routes/withdraw.route'
import referralRoutes from './routes/user.referral'
import postingRoutes from './routes/post.route'
import cookieParser from "cookie-parser";
import cors from "cors"; 


dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URI, // Replace with your client URL
  credentials: true, // Allow credentials (cookies) to be sent
}));

app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser())
// Database Connection
let isDbConnected = false; // <-- Add this at the top, after `dotenv.config()`

// Database Connection
dbConnect()
  .then(() => {
    console.log("Database connected successfully");
    isDbConnected = true; // <-- Set it to true when connected
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    isDbConnected = false;
  });

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.json({ 
    message: "API is WORKING", 
    database: isDbConnected ? "Connected" : "Not Connected" 
  });
});

app.get('/debug-sentry', function mainHandler(_req: Request, _res: Response) {
  throw new Error("My First Sentry Error!")
})

app.use('/api/auth' , authRoutes)
app.use('/api/referral', referralRoutes)
app.use("/api/easypaisa", withdrawRoutes);
app.use("/api/post", postingRoutes);

Sentry.setupExpressErrorHandler(app)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


