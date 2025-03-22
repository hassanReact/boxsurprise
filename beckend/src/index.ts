import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { clerkWebHook } from "./controllers/webhooks";
import * as Sentry from "@sentry/node";
import dbConnect from "./config/db";

dotenv.config();
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Database Connection
dbConnect()
// Routes
app.get('/', (_req : Request, res : Response) => {
  res.json({ Message: "API is WORKING" })
})
app.get('/debug-sentry', function mainHandler(_req: Request, _res: Response) {
  throw new Error("My First Sentry Error!")
})

app.post("/api/webhook", clerkWebHook);

Sentry.setupExpressErrorHandler(app)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

