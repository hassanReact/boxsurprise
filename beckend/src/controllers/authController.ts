import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import crypto from "crypto";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, referredBy } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate unique referral code
    const referralCode = crypto.randomBytes(5).toString("hex");

    // Find referrer
    let referrer = null;
    if (referredBy) {
      referrer = await User.findOne({ referralCode: referredBy });
    }

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      referralCode,
      referredBy: referrer ? referrer._id : null,
    });

    // Assign user to referral system
    if (referrer) {
      referrer.directReferrals.push(newUser._id);
      await referrer.save();
    }

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET as string, {
      expiresIn: "5h",
    });

    res.status(201).json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
