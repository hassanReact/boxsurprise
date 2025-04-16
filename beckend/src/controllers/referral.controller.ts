import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import crypto from "crypto";
import { sendInvitationEmail } from "../mailtrap/email";



export const invitationForReferral = asyncHandler(async (req: Request, res: Response) => {
  const { userEmail, referralEmail } = req.body;

  try {
    if (!userEmail || !referralEmail) {
      res.status(400);
      throw new Error("Both userEmail and referralEmail are required");
    }

    const user = await User.findOne({ email: userEmail });

    console.log(user)

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const invitationToken = crypto.randomBytes(20).toString("hex");
    const invitationTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    user.invitationToken = invitationToken;
    user.invitationTokenExpiresAt = invitationTokenExpiresAt;
    await user.save();

    const invitationLink = `${process.env.CLIENT_URI}/invitation-form/${invitationToken}`;

    // Send email with inviter's name and recipient's email
    await sendInvitationEmail(
      referralEmail,
      invitationLink,
      user.name || user.email, // fall back to email if name is missing
      referralEmail // assuming no name, just email
    );

    res.status(200).json({
      success: true,
      message: "Invitation email sent successfully",
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong while sending the invitation",
    });
  }
});

export const assignReferral = asyncHandler(async (req: Request, res: Response) => {
    
})
