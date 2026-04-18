import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

// Initialize Gemini API with key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Export the latest Gemini Flash model instance
export const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
