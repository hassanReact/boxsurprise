import { Request, Response } from "express";
import User from "../models/User";
import asyncHandler from "express-async-handler";

export const paymenyManually = asyncHandler(async (req : Request, res : Response) => {
    const {amount} = req.body;
    const {id} = req.params;
    try{
        const user = await User.findOneAndUpdate({
            id: id,
        }, {
            $inc: {
                purchasedAmount: amount,
            },
        }, {
        })
        if (!user) {
             res.status(404).json({ message: "User not found" });
        }
         res.status(200).json({ message: "Payment successfully", user });
    }catch (error) {
        console.error("Error updating user:", error);
         res.status(500).json({ message: "Internal server error" });
    }
})