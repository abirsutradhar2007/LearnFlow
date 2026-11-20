import express from "express";

import {
  register,
  login,
  refresh,
  submitQuiz,
  logout
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getProfile } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.post("/refresh", refresh);

userRouter.post("/submitQuiz", verifyJWT, submitQuiz);

userRouter.get("/profile", verifyJWT, getProfile);

userRouter.post("/logout", logout);

export default userRouter;