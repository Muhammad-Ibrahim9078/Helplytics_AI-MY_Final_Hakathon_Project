import { Request } from "../models/requestModel.js";
import { User } from "../models/userModel.js";


// Get AI Center insights (Trend Pulse, Urgency Watch, Mentor Pool)
export const getAIInsights = async (req, res) => {
    try {
        // Trend Pulse: most common category
        const categoryAgg = await Request.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);
        const trendCategory = categoryAgg.length > 0 ? categoryAgg[0]._id : "No data";

        // Urgency Watch: count of high-urgency open requests
        const highUrgencyCount = await Request.countDocuments({ urgency: "High", status: "Open" });

        // Mentor Pool: count of active helpers (users who have helped at least once)
        const mentorPool = await Request.aggregate([
            { $unwind: "$helpers" },
            { $group: { _id: "$helpers" } },
            { $count: "total" }
        ]);
        const mentorCount = mentorPool.length > 0 ? mentorPool[0].total : 0;

        return res.status(200).send({
            success: true,
            data: {
                trendPulse: {
                    tag: "TREND PULSE",
                    value: trendCategory,
                    desc: "Most common support area based on active community requests."
                },
                urgencyWatch: {
                    tag: "URGENCY WATCH",
                    value: String(highUrgencyCount),
                    desc: "Requests currently flagged high priority by the urgency detector."
                },
                mentorPool: {
                    tag: "MENTOR POOL",
                    value: String(mentorCount),
                    desc: "Trusted helpers with strong response history and contribution signals."
                }
            }
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// Get AI Recommendations - requests that need attention
export const getAIRecommendations = async (req, res) => {
    try {
        const requests = await Request.find({ status: "Open" })
            .populate("author", "username")
            .sort({ createdAt: -1 })
            .limit(10);

        const recommendations = requests.map(r => ({
            id: r._id,
            title: r.title,
            aiSummary: r.aiSummary || `${r.category} request with ${r.urgency.toLowerCase()} urgency. Best suited for members with relevant expertise.`,
            tags: [
                { label: r.category, color: getCategoryColor(r.category) },
                { label: r.urgency, color: getUrgencyColor(r.urgency) }
            ]
        }));

        return res.status(200).send({
            success: true,
            count: recommendations.length,
            data: recommendations
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// Helper functions for tag colors (matching frontend)
function getCategoryColor(category) {
    const colors = {
        "Web Development": "bg-[#e4efed] text-[#1a8570]",
        "Design": "bg-[#e8f0fe] text-[#1967d2]",
        "Career": "bg-gray-100 text-gray-600",
        "Mobile Development": "bg-[#e4efed] text-[#1a8570]",
        "Community": "bg-[#e4efed] text-[#1a8570]",
        "Other": "bg-gray-100 text-gray-600"
    };
    return colors[category] || "bg-gray-100 text-gray-600";
}

function getUrgencyColor(urgency) {
    const colors = {
        "High": "bg-[#feeceb] text-[#d93025]",
        "Medium": "bg-[#fef7e0] text-[#b06000]",
        "Low": "bg-[#e6f4ea] text-[#1e8e3e]"
    };
    return colors[urgency] || "bg-gray-100 text-gray-600";
}
