import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import crypto from "crypto";
import { sendInvitationEmail, sendVerificationEmail } from "../mailtrap/email";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";
import bcrypt from "bcrypt";
import { getReferralTree } from "../utils/getReferralTree";


export const invitationForReferral = asyncHandler(async (req: Request, res: Response) => {
    const { userEmail, referralEmail } = req.body;

    try {
        if (!userEmail || !referralEmail) {
            res.status(400);
            throw new Error("Both userEmail and referralEmail are required");
        }

        const user = await User.findOne({ email: userEmail });

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        if (!user.partOfReferral) {
          res.status(404).json({message : "Kindly Buy the Product to become the Part of Referral"}); 
        }

        const invitationToken = crypto.randomBytes(20).toString("hex");
        const invitationTokenExpiresAt = new Date(Date.now() + 60 * 60 * 60 * 1000); // 1 hour expiry

        user.invitationToken = invitationToken;
        user.invitationTokenExpiresAt = invitationTokenExpiresAt;
        await user.save();

        const invitationLink = `${process.env.CLIENT_URI}/register/${invitationToken}`;

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
  const { token } = req.params;
  const { firstName, lastName, email, password, phone } = req.body;


  if (!token || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  try {
    const referredUser = await User.findOne({
      invitationToken: token,
      invitationTokenExpiresAt: { $gt: new Date() }
    });

    if (!referredUser || !referredUser.isVerified) {
      res.status(400);
      throw new Error("Invalid or expired invitation token");
    }

    const existingUser = await User.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);
    const timestamp = Date.now().toString().slice(-5);
    const namePart = `${firstName}${lastName}`.replace(/\s+/g, "").toLowerCase().slice(0, 5);
    const phonePart = phone.slice(-4);
    const generatedReferralId = `${namePart}${phonePart}${timestamp}`;

    let user;

    if (existingUser && existingUser.isVerified === false) {
        res.status(400).json({
            success: false,
            message: "User already exists but not verified",
        });
        return;
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

    if (!existingUser) {
      user = await User.create({
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
        phone,
        referralId: generatedReferralId,
        referredBy: referredUser._id,
        VerificationToken :verificationCode,
        VerificationTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiry
      });
 
      sendVerificationEmail(user.email, verificationCode)
      referredUser.directReferrals.push(user._id);
    } else {
      user = existingUser;
      user.referredBy = referredUser._id;
      const PartOfReferral = user.partOfReferral
      PartOfReferral ? user.level = 1 : user.level = 0

      if (!referredUser.directReferrals.includes(user._id)) {
        referredUser.directReferrals.push(user._id);
      }

      await user.save();
      await referredUser.save();


      sendVerificationEmail(user.email, verificationCode);

        res.status(200).json({
            success: true,
            message: "User and Referral created successfully",
            user: {
            ...user.toObject(),
            password: undefined
            }
        });

    }

    referredUser.invitationToken = "";
    referredUser.invitationTokenExpiresAt = undefined;

    if (referredUser.directReferrals.length > 10) {
      referredUser.level = 2;
    }

    await referredUser.save();

    generateTokenAndSetCookie(res, user._id.toString());


    res.status(200).json({
      success: true,
      message: "Referral registered successfully",
      user: {
        ...user.toObject(),
        password: undefined
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message || "An unknown error occurred",
    });
  }
});

export const getDataForTree = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const tree = await getReferralTree(user.directReferrals || [], 5); // 4 levels deep

    res.status(200).json({
      message: 'Referral tree fetched successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        directReferrals: tree,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

