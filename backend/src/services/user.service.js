import { User } from "../models/user.model.js"
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { RefreshToken } from "../models/refreshToken.model.js";

import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken
} from "../utils/token.util.js";
import ApiError from "../utils/apiError.util.js";

export const registerUser = async (userData) => {
  const { username, email, password } = userData;

  // Check whether user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return user;
};


export const loginUser = async (email, password) => {
  // Find user and explicitly include password
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Compare entered password with hashed password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  return user;
};

export const recordQuizAttempt = async (userId, score) => {
  const user = await User.findByIdAndUpdate(
    userId,
    [
      {
        $set: {
          "activity.totalQuizzesAttempted": {
            $add: [
              { $ifNull: ["$activity.totalQuizzesAttempted", 0] },
              1,
            ],
          },
          "activity.totalQuizScore": {
            $add: [
              { $ifNull: ["$activity.totalQuizScore", 0] },
              score,
            ],
          },
        },
      },
      {
        $set: {
          "activity.averageQuizPercentage": {
            $divide: [
              "$activity.totalQuizScore",
              "$activity.totalQuizzesAttempted",
            ],
          },
        },
      },
    ],
    { new: true, updatePipeline: true }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

const hashToken = (token) => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

export const issueTokenPair = async (
  userId,
  familyId = crypto.randomUUID()
) => {

  const accessToken = createAccessToken(userId);

  const refreshToken = createRefreshToken(
    userId,
    familyId
  );

  const decoded = jwt.decode(refreshToken);

  await RefreshToken.create({
    userId,
    jti: decoded.jti,
    tokenHash: hashToken(refreshToken),
    familyId,
    expiresAt: new Date(decoded.exp * 1000),
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshUserTokens = async (rawToken) => {

  if (!rawToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  // 1. Verify refresh JWT
  let decoded;

  try {
    decoded = verifyRefreshToken(rawToken);
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  // 2. Find stored refresh-token record
  const existingToken = await RefreshToken.findOne({
    jti: decoded.jti,
    tokenHash: hashToken(rawToken),
  });

  if (!existingToken) {
    throw new ApiError(401, "Refresh token not recognized");
  }

  // 3. Detect reuse of an already revoked token
  if (existingToken.revokedAt) {

    await RefreshToken.updateMany(
      { familyId: existingToken.familyId },
      { $set: { revokedAt: new Date() } }
    );

    throw new ApiError(
      401,
      "Refresh token reuse detected. Please log in again."
    );
  }

  // 4. Atomically revoke the current token
  const result = await RefreshToken.updateOne(
    {
      _id: existingToken._id,
      revokedAt: null,
      expiresAt: { $gt: new Date() },
    },
    {
      $set: {
        revokedAt: new Date(),
      },
    }
  );

  // 5. Detect concurrent reuse
  if (result.modifiedCount !== 1) {

    await RefreshToken.updateMany(
      { familyId: existingToken.familyId },
      { $set: { revokedAt: new Date() } }
    );

    throw new ApiError(401, "Refresh token already used");
  }

  // 6. Generate new tokens in the same family
  const accessToken = createAccessToken(decoded.sub);

  const refreshToken = createRefreshToken(
    decoded.sub,
    existingToken.familyId
  );

  // 7. Decode the newly generated token for its claims
  const newDecoded = jwt.decode(refreshToken);

  // 8. Store replacement refresh-token record
  await RefreshToken.create({
    userId: decoded.sub,
    jti: newDecoded.jti,
    tokenHash: hashToken(refreshToken),
    familyId: existingToken.familyId,
    expiresAt: new Date(newDecoded.exp * 1000),
  });

  // 9. Link the old token to its replacement
  await RefreshToken.updateOne(
    { _id: existingToken._id },
    {
      $set: {
        replacedByJti: newDecoded.jti,
      },
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const logoutUser = async (rawToken) => {

  if (!rawToken) {
    return;
  }

  await RefreshToken.updateOne(
    {
      tokenHash: hashToken(rawToken),
      revokedAt: null,
    },
    {
      $set: {
        revokedAt: new Date(),
      },
    }
  );
};
