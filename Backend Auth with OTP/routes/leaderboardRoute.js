import express from "express";
import {
    getLeaderboard,
    getBadges
} from "../controllers/leaderboardController.js";

const router = express.Router();

// Leaderboard is publicly visible
router.get("/", getLeaderboard);
router.get("/badges", getBadges);

export default router;
