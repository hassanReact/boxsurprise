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
      required: false,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: false,
      unique: true,
      match: /^[0-9]{10,15}$/,
    },
    RootUser: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
      required: false,
    },
    referralId: {
      type: String,
      unique: true,
      index: true,
      sparse: true, // only creates index on non-null values
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
    level: {
      type: Number,
      default: 0,
      enum: [0, 1, 2, 3, 4, 5], // Levels from 0 to 5
    },
    Title: {
      type: String,
      default: "",
    },
    commission: {
      type: String,
      default: "0%",
    },
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
    VerificationToken: {
      type: String,
      required: false,
    },
    VerificationTokenExpiresAt: {
      type: Date,
      required: false,
    },
    lastLogin: {
      type: Date,
      required: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    invitationToken: {
      type: String,
      required: false,
    },
    invitationTokenExpiresAt: {
      type: Date,
      required: false,
    },
    resetPasswordExpiresAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

// Middleware to set Title and Commission based on level
userSchema.pre("save", function (next) {
  const titles = [
    "None",
    "Sales Order Booker",
    "Sales Officer",
    "Area Sales Manager",
    "Regional Sales Manager",
    "General Manager",
  ];

  const commissions = [0, 5, 4, 3, 2, 1]; // Index = level, Value = %
  const commissionsInPercentage = commissions.map((c) => `${c}%`);
  this.Title = titles[this.level] || "";
  this.commission = commissionsInPercentage[this.level] || "0%";

  next();
});

// Virtual field to get LevelTitle based on level
userSchema.virtual("LevelTitle").get(function () {
  const titles = [
    "None",
    "Sales Order Booker",
    "Sales Officer",
    "Area Sales Manager",
    "Regional Sales Manager",
    "General Manager",
  ];
  return titles[this.level] || "";
});

// Ensure virtual fields are serialized
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

const User = mongoose.model("User", userSchema);

export default User;
