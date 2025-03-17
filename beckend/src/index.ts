import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import dbConnect from './config/db';
import './config/instrument'
import Sentry from '@sentry/node'
import { clerkWebHook } from './controllers/webHooks';

// Initialize dotenv to read environment variables
dotenv.config();

// Create an instance of express
const app = express();

Sentry.setupExpressErrorHandler(app);
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.get("/webhooks", clerkWebHook)

// Middleware
app.use(express.json());
app.use(cors());

dbConnect()
// Routes
app.use('/api/users', userRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
