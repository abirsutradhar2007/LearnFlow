
import express from "express";
import generateMaterials from "../controllers/material.controller.js";

const materialRouter = express.Router();

materialRouter.post("/", generateMaterials);

export default materialRouter;
