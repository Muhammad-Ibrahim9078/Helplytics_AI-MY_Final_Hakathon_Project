import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import {
    sendMessage,
    getConversations,
    getMessagesWith
} from "../controllers/messageController.js";

const router = express.Router();

// All message routes are protected
router.post("/", isAuthenticated, sendMessage);
router.get("/", isAuthenticated, getConversations);
router.get("/:partnerId", isAuthenticated, getMessagesWith);

export default router;
