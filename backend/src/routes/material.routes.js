import express from "express";
import { getAllMaterials, getMaterialByVideoId, generateMaterials } from "../controllers/material.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const materialRouter = express.Router();

materialRouter.use(verifyJWT);

materialRouter.post("/", generateMaterials);

materialRouter.get("/", getAllMaterials);

materialRouter.get("/:videoId", getMaterialByVideoId);

export default materialRouter;
