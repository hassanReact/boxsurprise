import { Verification } from "@clerk/clerk-sdk-node";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      select: false, 
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    phone : {
      type: String,
      required: false,
      unique: true,
      match: /^[0-9]{10,15}$/,
    },
    RootUser : {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image:{
      type: String,
      required: false 
    },
    referralId: {
      type: String,
      unique: true,
      index : true,
      sparse: true // only creates index on non-null values

    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    directReferrals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    earnings: {
      total: {
        type: Number,
        default: 0,
      },
      pending: {
        type: Number,
        default: 0,
      },
      withdrawn: {
        type: Number,
        default: 0,
      },
    },
    withdrawalRequests: [
      {
        amount: Number,
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    VerifcationToken: {
      type: String,
      required: false,
    },
    VerificationTokenExpiresAt: {
      type: Date,
      required: true,
    },
    lastLogin: {
      type: Date,
      required: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpiresAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;

