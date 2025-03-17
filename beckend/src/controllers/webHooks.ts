import { Webhook } from "svix";
import User from "../models/User";
import { Request, Response } from "express";

export const clerkWebHook = async (req: Request, res: Response): Promise<void> => {
  try {
    const svixHeaders = {
      "svix-id": req.headers["svix-id"] as string || "",
      "svix-timestamp": req.headers["svix-timestamp"] as string || "",
      "svix-signature": req.headers["svix-signature"] as string || "",
    };

    // Verify Webhook
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET as string);
    const payload = JSON.stringify(req.body);
    whook.verify(payload, svixHeaders);

    // Extract event type and user data
    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const { id, email_addresses, first_name, last_name } = data;
        const email = email_addresses?.[0]?.email_address || "";

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(200).json({ message: "User already exists." });
        }

        const newUser = new User({
          id,
          name: `${first_name} ${last_name}`,
          email,
          password: "", 
          role: "user",
          referralCode: generateReferralCode(),
        });

        await newUser.save();
        return res.status(201).json({ message: "User created successfully." });
      }

      case "user.updated": {
        const { id, first_name, last_name } = data;
        await User.findOneAndUpdate(
          { id },
          { name: `${first_name} ${last_name}` },
          { new: true }
        );
        return res.status(200).json({ message: "User updated successfully." });
      }

      case "user.deleted": {
        const { id } = data;
        await User.findOneAndDelete({ id });
        return res.status(200).json({ message: "User deleted successfully." });
      }

      default:
        return res.status(400).json({ message: "Unhandled event type." });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(400).json({ message: "Invalid webhook request." });
  }
};

// Function to generate a referral code
const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};
