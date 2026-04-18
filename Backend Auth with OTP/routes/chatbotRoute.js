import express from "express";
import { chatWithGemini } from "../controllers/chatbotController.js";

const router = express.Router();

// Public route for Gemini Chatbot
router.post('/send-message', chatWithGemini);

export default router;
