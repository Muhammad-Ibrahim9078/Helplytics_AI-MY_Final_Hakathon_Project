import { geminiModel } from "../database/geminiConfig.js";

/**
 * Controller to handle chat requests with Google Gemini 1.5 Flash.
 */
export const chatWithGemini = async (req, res) => {
    try {
        const { message } = req.body;

        // Validate request body
        if (!message) {
            return res.status(400).send({
                success: false,
                message: "Message is required"
            });
        }

        // Generate content using Gemini
        const result = await geminiModel.generateContent(message);
        const response = await result.response;
        const text = response.text();

        // Send back the generated text
        return res.status(200).send({
            success: true,
            message: "Response generated successfully",
            data: text
        });

    } catch (error) {
        console.error("Gemini Integration Error:", error);

        // Map common errors
        let status = 500;
        let errMsg = error.message || "An error occurred while communicating with Gemini API.";

        if (errMsg.includes("API key not valid")) {
            status = 401;
            errMsg = "Invalid Gemini API Key. Please check your .env file.";
        }

        return res.status(status).send({
            success: false,
            message: errMsg
        });
    }
};
