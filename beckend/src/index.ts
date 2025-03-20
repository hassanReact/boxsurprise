import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/userRoutes"
import userRoutes from "./routes/userRoutes";
import { clerkWebHook } from "./controllers/webHooks";

dotenv.config();
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Database Connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => console.error("❌ Database Connection Failed", err));

// Routes
app.use('/' , (req ,res) => {
  res.json({Message : "API is WORKING"})
})
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/webhook", clerkWebHook);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
