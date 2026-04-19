import { Request } from "../models/requestModel.js";
import { User } from "../models/userModel.js";
import { Notification } from "../models/notificationModel.js";
import { Message } from "../models/messageModel.js";
import { geminiModel } from "../database/geminiConfig.js";


// Create a new help request
export const createRequest = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, description, tags, category, urgency } = req.body;

        if (!title) {
            return res.status(400).send({
                success: false,
                message: "Title is required"
            });
        }

        // Parse tags if it's a comma-separated string
        let parsedTags = tags;
        if (typeof tags === "string") {
            parsedTags = tags.split(",").map(t => t.trim()).filter(t => t);
        }

        // Generate AI summary using Gemini
        let aiSummary = "";
        let aiTags = [];
        try {
            const prompt = `You are an AI assistant for a community help platform. Summarize this help request in 1-2 sentences. Also suggest 3 relevant tags.

Title: ${title}
Description: ${description || "No description provided"}
Category: ${category || "General"}

Respond in JSON format: {"summary": "...", "tags": ["tag1", "tag2", "tag3"]}`;

            const result = await geminiModel.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Try to parse JSON from the response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                aiSummary = parsed.summary || "";
                aiTags = parsed.tags || [];
            }
        } catch (aiError) {
            console.log("AI summary generation failed, continuing without it:", aiError.message);
        }

        const newRequest = await Request.create({
            title,
            description: description || "",
            tags: parsedTags || [],
            category: category || "Other",
            urgency: urgency || "Medium",
            author: userId,
            aiSummary,
            aiTags
        });

        // Update user contributions
        await User.findByIdAndUpdate(userId, { $inc: { contributions: 1 } });

        // Create notification for the author
        await Notification.create({
            userId,
            title: `Your request "${title}" is now live in the community feed`,
            category: "Request"
        });

        const populatedRequest = await Request.findById(newRequest._id).populate("author", "username email location trustScore");

        return res.status(201).send({
            success: true,
            message: "Request created successfully",
            data: populatedRequest
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// Get all requests with filters
export const getAllRequests = async (req, res) => {
    try {
        const { category, urgency, search, status, location, skills } = req.query;

        let filter = {};

        if (category && category !== "All categories") {
            filter.category = category;
        }
        if (urgency && urgency !== "All urgency levels") {
            filter.urgency = urgency;
        }
        if (status) {
            filter.status = status;
        }
        if (skills) {
            // Treat skills input as a tags search
            const skillsArr = skills.split(",").map(s => s.trim().toLowerCase());
            filter.tags = { $in: skillsArr.map(s => new RegExp(s, "i")) };
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { tags: { $in: [new RegExp(search, "i")] } }
            ];
        }

        let requests = await Request.find(filter)
            .populate({
                path: "author",
                select: "username email location trustScore",
                match: location ? { location: { $regex: location, $options: "i" } } : undefined
            })
            .populate("helpers", "username email skills trustScore")
            .sort({ createdAt: -1 });

        // Remove requests where author became null due to location mismatch
        if (location) {
            requests = requests.filter(req => req.author !== null);
        }

        return res.status(200).send({
            success: true,
            count: requests.length,
            data: requests
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// Get single request by ID
export const getRequestById = async (req, res) => {
    try {
        const { id } = req.params;

        const request = await Request.findById(id)
            .populate("author", "username email location trustScore skills badges")
            .populate("helpers", "username email skills trustScore");

        if (!request) {
            return res.status(404).send({
                success: false,
                message: "Request not found"
            });
        }

        return res.status(200).send({
            success: true,
            data: request
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// Offer help on a request
export const offerHelp = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const request = await Request.findById(id);
        if (!request) {
            return res.status(404).send({
                success: false,
                message: "Request not found"
            });
        }

        // Check if already a helper
        if (request.helpers.includes(userId)) {
            return res.status(400).send({
                success: false,
                message: "You have already offered help on this request"
            });
        }

        request.helpers.push(userId);
        await request.save();

        // Update helper's contribution count
        await User.findByIdAndUpdate(userId, { $inc: { contributions: 1 } });

        // Get helper name for notification
        const helper = await User.findById(userId);

        // Notify the request author
        await Notification.create({
            userId: request.author,
            title: `${helper.username} offered help on "${request.title}"`,
            category: "Match"
        });

        // Automatically start a conversation by sending an auto-message
        await Message.create({
            from: userId,
            to: request.author,
            content: `Hello! I can help you with your request: "${request.title}". Let's chat!`,
            requestId: request._id
        });

        const updatedRequest = await Request.findById(id)
            .populate("author", "username email location trustScore")
            .populate("helpers", "username email skills trustScore");

        return res.status(200).send({
            success: true,
            message: "Successfully offered help",
            data: updatedRequest
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// Mark a request as solved
export const markAsSolved = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;

        const request = await Request.findById(id);
        if (!request) {
            return res.status(404).send({
                success: false,
                message: "Request not found"
            });
        }

        request.status = "Solved";
        await request.save();

        // Boost trust scores for all helpers
        if (request.helpers.length > 0) {
            await User.updateMany(
                { _id: { $in: request.helpers } },
                { $inc: { trustScore: 2, contributions: 1 } }
            );

            // Notify helpers
            for (const helperId of request.helpers) {
                await Notification.create({
                    userId: helperId,
                    title: `"${request.title}" was marked as solved`,
                    category: "Status"
                });

                await Notification.create({
                    userId: helperId,
                    title: "Your trust score increased after a solved request",
                    category: "Reputation"
                });
            }
        }

        // Notify the author
        await Notification.create({
            userId: request.author,
            title: `"${request.title}" was marked as solved`,
            category: "Status"
        });

        return res.status(200).send({
            success: true,
            message: "Request marked as solved",
            data: request
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// Get AI suggestions for a request draft
export const getAISuggestions = async (req, res) => {
    try {
        const { title, description, skills, interests } = req.body;

        // If skills/interests are provided, it's for the Onboarding Page
        if (skills || interests) {
            const prompt = `You are an AI for a community support platform. A new user is onboarding.
Skills they have: ${skills || "None specified"}
Interests: ${interests || "None specified"}

Respond in EXACT JSON format with smart suggestions:
{
  "helpProvide": ["Skill 1", "Skill 2"],
  "helpNeed": ["Area 1", "Area 2"]
}`;
            const result = await geminiModel.generateContent(prompt);
            const text = (await result.response).text();
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return res.status(200).send({ success: true, data: JSON.parse(jsonMatch[0]) });
            }
            return res.status(400).send({ success: false, message: "AI failed to parse" });
        }

        if (!title && !description) {
            return res.status(400).send({
                success: false,
                message: "Provide at least a title or description"
            });
        }

        const prompt = `You are HelpHub AI, an assistant for a student community support platform. Analyze this help request and provide smart suggestions.

Title: ${title || "Not provided"}
Description: ${description || "Not provided"}

Respond in JSON format:
{
  "suggestedCategory": "one of: Web Development, Mobile Development, Design, Career, Community, Other",
  "detectedUrgency": "one of: High, Medium, Low",
  "suggestedTags": ["tag1", "tag2", "tag3"],
  "rewriteSuggestion": "A stronger version of the description (2-3 sentences)"
}`;

        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return res.status(200).send({
                success: true,
                data: parsed
            });
        }

        return res.status(200).send({
            success: true,
            data: {
                suggestedCategory: "Community",
                detectedUrgency: "Low",
                suggestedTags: ["Add more detail for smarter tags"],
                rewriteSuggestion: "Start describing the challenge to generate a stronger version."
            }
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// Get dashboard stats
export const getDashboardStats = async (req, res) => {
    try {
        const totalMembers = await User.countDocuments({ isVerified: true });
        const totalRequests = await Request.countDocuments();
        const solvedRequests = await Request.countDocuments({ status: "Solved" });

        return res.status(200).send({
            success: true,
            data: {
                members: totalMembers,
                requests: totalRequests,
                solved: solvedRequests
            }
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
