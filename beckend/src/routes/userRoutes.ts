import express from "express";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser); // User registration
router.post("/login", loginUser); // User login

export default router;
