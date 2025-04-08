import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const signup = asyncHandler(async (req: Request, res: Response) => {

    try {

        const { firstName, lastName, email, phone, password, referralId } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const timestamp = Date.now().toString().slice(-5);
        const namePart = `${firstName}${lastName}`.replace(/\s+/g, "").toLowerCase().slice(0, 5);
        const phonePart = phone.slice(-4);
        const generatedReferralId = `${namePart}${phonePart}${timestamp}`;

        const userData = {
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
            phone,
            ...(referralId?.trim() === "" || !referralId ? { referralId: generatedReferralId, RootUser : true } : ""),
        };

        const newUser = await User.create(userData);

        res.status(201).json({
            message: referralId?.trim() === "" || !referralId ? "Admin created successfully" : "User created successfully",
            newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
});
