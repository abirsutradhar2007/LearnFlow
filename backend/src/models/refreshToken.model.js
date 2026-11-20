import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jti: {
      type: String,
      required: true,
      unique: true,
    },

    tokenHash: {
      type: String,
      required: true,
    },

    familyId: {
      type: String,
      required: true,
      index: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    revokedAt: {
      type: Date,
      default: null,
    },

    replacedByJti: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

refreshTokenSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

export const RefreshToken = mongoose.model(
  "RefreshToken",
  refreshTokenSchema
);