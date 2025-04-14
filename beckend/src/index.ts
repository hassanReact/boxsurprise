import express, { Request, Response } from "express";
import dotenv from "dotenv";
import * as Sentry from "@sentry/node";
import dbConnect from "./config/db";
import authRoutes from './routes/auth.route'
import cookieParser from "cookie-parser";
import cors from "cors"; 

dotenv.config();
const app = express();

app.use(cors());


app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser())
// Database Connection
dbConnect()
// Routes
app.get('/', (_req : Request, res : Response) => {
  res.json({ Message: "API is WORKING" })
})

app.get('/debug-sentry', function mainHandler(_req: Request, _res: Response) {
  throw new Error("My First Sentry Error!")
})

app.use('/api/auth' , authRoutes)
Sentry.setupExpressErrorHandler(app)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


