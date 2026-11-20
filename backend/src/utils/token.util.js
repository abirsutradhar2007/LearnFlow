import jwt from "jsonwebtoken";
import crypto from "crypto";

export const createAccessToken = (userId) => {

  return jwt.sign(
    {
      sub: userId.toString(),
      tokenUse: "access",
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "15m",
      issuer: "learnflow-api",
      audience: "learnflow-client",
      jwtid: crypto.randomUUID(),
    }
  );
};

export const createRefreshToken = (
  userId,
  familyId
) => {

  return jwt.sign(
    {
      sub: userId.toString(),
      tokenUse: "refresh",
      familyId,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "7d",
      issuer: "learnflow-api",
      audience: "learnflow-client",
      jwtid: crypto.randomUUID(),
    }
  );
};
export const verifyAccessToken = (token) => {

  const payload = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    {
      algorithms: ["HS256"],
      issuer: "learnflow-api",
      audience: "learnflow-client",
    }
  );

  if (payload.tokenUse !== "access") {
    throw new Error("Invalid token type");
  }

  return payload;
};

export const verifyRefreshToken = (token) => {

  const payload = jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    {
      algorithms: ["HS256"],
      issuer: "learnflow-api",
      audience: "learnflow-client",
    }
  );

  if (payload.tokenUse !== "refresh") {
    throw new Error("Invalid token type");
  }

  return payload;
};