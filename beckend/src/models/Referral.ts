import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
  {
    referrer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    referredUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    earnings: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Referral = mongoose.model("Referral", referralSchema);
export default Referral;