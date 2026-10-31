import express from "express";
import { getAllMaterials, getMaterialByVideoId, generateMaterials } from "../controllers/material.controller.js";


const materialRouter = express.Router();

materialRouter.post("/", generateMaterials);

materialRouter.get("/", getAllMaterials);

materialRouter.get("/:videoId", getMaterialByVideoId);

export default materialRouter;
