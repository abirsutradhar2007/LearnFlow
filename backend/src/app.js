import express from "express";
import materialRouter from "./routes/material.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Health check
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "LearnFlow API is running"
    });
});

// Routes
app.use("/api/v1/materials", materialRouter);
app.use("/api/v1/users", userRouter);

//error handling
app.use(errorMiddleware);

export default app;
