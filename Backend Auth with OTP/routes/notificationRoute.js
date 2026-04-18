import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
    getNotifications,
    markAsRead,
    markAllAsRead
} from "../controllers/notificationController.js";

const router = express.Router();

// All notification routes are protected
router.get("/", isAuthenticated, getNotifications);
router.put("/read-all", isAuthenticated, markAllAsRead);
router.put("/:id/read", isAuthenticated, markAsRead);

export default router;
