import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const validateSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        next(); // Everything is okay, continue to controller
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error validating user" });
    }
};
