import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: false
    },
    isLoggedIn: {
        type: Boolean,
        required: false
    },
    token: {
        type: String,
        required: null
    },
    otp: {
        type: String,
        required: null
    },
    otpExpiry: {
        type: Date,
        required: null
    },
    // Profile fields
    location: {
        type: String,
        default: ""
    },
    skills: {
        type: [String],
        default: []
    },
    interests: {
        type: [String],
        default: []
    },
    badges: {
        type: [String],
        default: []
    },
    trustScore: {
        type: Number,
        default: 100
    },
    contributions: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        enum: ["Helper", "Requester", "Both"],
        default: "Both"
    }
},{ timestamps: true});


export const User = mongoose.model("User", userSchema);