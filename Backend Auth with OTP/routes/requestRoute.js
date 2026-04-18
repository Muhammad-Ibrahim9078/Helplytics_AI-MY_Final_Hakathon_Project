import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
    createRequest,
    getAllRequests,
    getRequestById,
    offerHelp,
    markAsSolved,
    getAISuggestions,
    getDashboardStats
} from "../controllers/requestController.js";

const router = express.Router();

// Static routes FIRST (before /:id)
router.get("/stats", getDashboardStats);
router.post("/ai-suggestions", isAuthenticated, getAISuggestions);

// CRUD routes
router.get("/", getAllRequests);
router.post("/", isAuthenticated, createRequest);

// Dynamic param routes LAST
router.get("/:id", getRequestById);
router.put("/:id/help", isAuthenticated, offerHelp);
router.put("/:id/solve", isAuthenticated, markAsSolved);

export default router;
