import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";
import { sendPasswordResetEmail, sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail } from "../mailtrap/email";
import crypto from "crypto";

export const signup = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, email, phone, password, referralId } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }



    let generatedReferralId = "";
    if (!referralId || referralId.trim() === "") {
        const timestamp = Date.now().toString().slice(-5);
        const namePart = `${firstName}${lastName}`.replace(/\s+/g, "").toLowerCase().slice(0, 5);
        const phonePart = phone.slice(-4);
        generatedReferralId = `${namePart}${phonePart}${timestamp}`;
    }

    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const VerificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.create({
        name: `${firstName} ${lastName}`,
        email,
        phone,
        password: hashedPassword,
        VerifcationToken : VerificationToken,
        VerificationTokenExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
        referralId: !referralId?.trim() ? generatedReferralId : referralId.trim(),
        ...(referralId?.trim() === ""
            ? { RootUser: true, role: "admin" }
            : {}),
    });
    

    await user.save()

    generateTokenAndSetCookie(res , user._id.toString());
    await sendVerificationEmail(user.email, VerificationToken);
    
    res.status(201).json({
        success: true,
        message : "User Created Successfully",
        user : {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            referralId: user.referralId,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            earnings: user.earnings,
            directReferrals: user.directReferrals,
            referredBy: user.referredBy,
            VerificationToken: user.VerifcationToken,
            VerificationTokenExpiresAt: user.VerificationTokenExpiresAt,
            image: user.image,
        }
    });
});


export const login = async (req: Request, res: Response) => {
    const { email, password} = req.body;

    try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            res.status(401);
            throw new Error("Invalid email or password");
        }

        console.log(user.password)

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            res.status(401);
            throw new Error("Invalid password");
        }

        if (!user.isVerified) {
            res.status(401);
            throw new Error("User is not verified");
        }

        generateTokenAndSetCookie(res , user._id.toString());
        user.lastLogin = new Date();

        res.status(200).json({
            success: true,
            message: "Login Successful",
            user: {
                ...user.toObject(),
                password: undefined
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("token")
    
    res.status(200).json({
        success: true,
        message: "Logout Successful",
    });
}

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {

    const { code } = req.body;

    if (!code) {
        res.status(400);
        throw new Error("Verification code is required");
    }

    try {
        const user = await User.findOneAndUpdate(
            { VerifcationToken: code },
            {
              $set: {
                isVerified: true,
                VerificationTokenExpiresAt: new Date(0),
              },
              $unset: {
                VerifcationToken: "",
              },
            },
            { new: true }
          );


        if (!user) {
            res.status(400);
            throw new Error("Invalid or expired verification code");
        }



        if (user) {
            await sendWelcomeEmail(user.email, user.name);
        } else {
            res.status(400);
            throw new Error("Invalid or expired verification code");
        }

        res.status(200).json({
            success : true,
            message : "Email verified successfully",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
})

export const forgetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    if (!email) {
      res.status(400);
      throw new Error("Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    const resetToken = crypto.randomBytes(20).toString("hex"); 
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 10 minutes
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    sendPasswordResetEmail(user.email, `${process.env.CLIENT_URI}/reset-password/${resetToken}`); // Implement this function to send the email

    res.status(200).json({
      success: true,
      message: "Reset password email sent successfully",
    });
  } catch (error) {
    
  }

})

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params
    const { password } = req.body;

    if (!token || !password) {
        res.status(400);
        throw new Error("Token and password are required");
    }

    try {
        const user = await User.findOne({ resetPasswordToken: token , resetPasswordExpiresAt : { $gt : Date.now() }}).select("+password");

        if (!user) {
            res.status(400);
            throw new Error("Invalid or expired token");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        user.lastLogin = new Date();

        await user.save();

        generateTokenAndSetCookie(res , user._id.toString());

        sendResetPasswordEmail(user.email); // Implement this function to send the email

        res.status(200).json({
            success: true,
            message : "Password reset successfully",
            user : {
                ...user.toObject(),
                password: undefined
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
})

interface AuthRequest extends Request {
    userId?: string;
}

export const checkAuth = asyncHandler(async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        
        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }

        res.status(200).json({
            success: true,
            message : "User found",
            user : {
                ...user.toObject(),
                password: undefined
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
})