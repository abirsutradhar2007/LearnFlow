import ApiError from "../utils/apiError.util.js";
import { verifyAccessToken } from "../utils/token.util.js";

export const verifyJWT = (req, res, next) => {
  try {

    const token = req.cookies.accessToken;

    if (!token) {
      throw new ApiError(401, "Unauthorized access");
    }

    const decoded = verifyAccessToken(token);

    req.auth = {
      userId: decoded.sub,
      tokenId: decoded.jti,
    };

    next();

  } catch (error) {

    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return next(
        new ApiError(401, "Invalid or expired access token")
      );
    }

    next(error);
  }
};