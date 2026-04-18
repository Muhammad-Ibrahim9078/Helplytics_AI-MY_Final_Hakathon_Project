import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
    getAIInsights,
    getAIRecommendations
} from "../controllers/aiCenterController.js";

const router = express.Router();

// AI Center routes (protected)
router.get("/insights", isAuthenticated, getAIInsights);
router.get("/recommendations", isAuthenticated, getAIRecommendations);

export default router;
