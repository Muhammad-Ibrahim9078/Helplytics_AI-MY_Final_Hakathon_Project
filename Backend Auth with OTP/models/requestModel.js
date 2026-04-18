import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    tags: {
        type: [String],
        default: []
    },
    category: {
        type: String,
        enum: ["Web Development", "Mobile Development", "Design", "Career", "Community", "Other"],
        default: "Other"
    },
    urgency: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Medium"
    },
    status: {
        type: String,
        enum: ["Open", "Solved"],
        default: "Open"
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    helpers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    aiSummary: {
        type: String,
        default: ""
    },
    aiTags: {
        type: [String],
        default: []
    }
}, { timestamps: true });

export const Request = mongoose.model("Request", requestSchema);
