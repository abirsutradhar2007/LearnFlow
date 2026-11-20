import {
  registerUser,
  loginUser,
  recordQuizAttempt,
} from "../services/user.service.js";

import {
  refreshUserTokens
} from "../services/user.service.js";

import {
  issueTokenPair
} from "../services/user.service.js";

import {
  accessCookieOptions,
  refreshCookieOptions
} from "../config/token.config.js";

import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.util.js";
import { logoutUser } from "../services/user.service.js";


export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const user = await registerUser({
      username,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    // Verify user credentials
    const user = await loginUser(
      email,
      password,
    );

    // Generate access and refresh tokens
    const tokens = await issueTokenPair(user._id);

    // Store tokens in HTTP-only cookies
    res.cookie(
      "accessToken",
      tokens.accessToken,
      accessCookieOptions
    );

    res.cookie(
      "refreshToken",
      tokens.refreshToken,
      refreshCookieOptions
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",

      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    next(error);
  }
};



export const getProfile = async (req, res, next) => {
  try {

    const user = await User.findById(req.auth.userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        activity: {
          totalMaterialsGenerated: user.activity?.totalMaterialsGenerated ?? 0,
          totalQuizzesAttempted: user.activity?.totalQuizzesAttempted ?? 0,
          averageQuizPercentage: user.activity?.averageQuizPercentage ?? 0,
        },
      },
    });

  } catch (error) {
    next(error);
  }
};

export const submitQuiz = async (req, res, next) => {
  try {
    const score = req.body && req.body.score;

    if (
      typeof score !== "number" ||
      !Number.isFinite(score) ||
      score < 0 ||
      score > 100
    ) {
      throw new ApiError(
        400,
        "Quiz score must be a percentage between 0 and 100"
      );
    }

    const user = await recordQuizAttempt(req.auth.userId, score);

    return res.status(200).json({
      success: true,
      message: "Quiz submitted successfully",
      data: {
        score,
        totalQuizzesAttempted: user.activity.totalQuizzesAttempted,
        totalQuizScore: user.activity.totalQuizScore,
        averageQuizPercentage: user.activity.averageQuizPercentage,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const refresh = async (req, res, next) => {
  try {

    const oldRefreshToken = req.cookies.refreshToken;

    const tokens = await refreshUserTokens(
      oldRefreshToken
    );

    // Replace old cookies with new tokens
    res.cookie(
      "accessToken",
      tokens.accessToken,
      accessCookieOptions
    );

    res.cookie(
      "refreshToken",
      tokens.refreshToken,
      refreshCookieOptions
    );

    return res.status(200).json({
      success: true,
      message: "Tokens refreshed successfully",
    });

  } catch (error) {
    next(error);
  }
};



export const logout = async (req, res, next) => {
  try {

    await logoutUser(req.cookies.refreshToken);

    res.clearCookie("accessToken", {
      ...accessCookieOptions,
      maxAge: undefined,
    });

    res.clearCookie("refreshToken", {
      ...refreshCookieOptions,
      maxAge: undefined,
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    next(error);
  }
};