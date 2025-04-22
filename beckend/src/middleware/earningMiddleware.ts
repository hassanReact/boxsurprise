import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { countIndirectReferrals } from "../utils/countIndirectReferrals";

export const earning = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "No user found" });
      return;
    }

    const directReferrals = user.directReferrals || [];
    const indirectReferralCount = await countIndirectReferrals(directReferrals);

    let newLevel = user.level || 1;

    if (newLevel < 2 && directReferrals.length >= 10 && user.purchasedAmount >= 5000) {
      newLevel = 2;
    } else if (newLevel < 3 && indirectReferralCount >= 100) {
      newLevel = 3;
    } else if (newLevel < 4 && indirectReferralCount >= 1000) {
      newLevel = 4;
    } else if (newLevel < 5 && indirectReferralCount >= 10000) {
      newLevel = 5;
    } else if (newLevel < 6 && indirectReferralCount >= 100000) {
      newLevel = 6;
    }

    if (newLevel !== user.level) {
      user.level = newLevel;
      await user.save();
    }

    // Optionally pass data to next middleware
    req.body.user = user;
    req.body.currentLevel = newLevel;
    req.body.indirectReferralCount = indirectReferralCount;

    next(); // Go to next middleware or route handler
  } catch (error) {
    console.error("Earning middleware error:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};
