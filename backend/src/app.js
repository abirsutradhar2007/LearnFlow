import express from "express";
import materialRouter from "./routes/material.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cors from "cors";



const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "LearnFlow API is running"
    });
});

// Routes
app.use("/api/v1/materials", materialRouter);

//error handling
app.use(errorMiddleware);

export default app;
