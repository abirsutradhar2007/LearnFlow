import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    activity: {
      totalMaterialsGenerated: {
        type: Number,
        default: 0
      },

      totalQuizzesAttempted: {
          type: Number,
          default: 0
      },

      totalQuizScore: {
          type: Number,
          default: 0
      },

      averageQuizPercentage: {
          type: Number,
          default: 0
      }
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);