// Seed script to populate the database with realistic HelpHub AI data
// Run with: node seed.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dns from "dns";
import 'dotenv/config';

// DNS fix for MongoDB Atlas
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");

import { User } from "./models/userModel.js";
import { Request } from "./models/requestModel.js";
import { Message } from "./models/messageModel.js";
import { Notification } from "./models/notificationModel.js";

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "User" });
        console.log("Connected to MongoDB for seeding...");

        // Clear existing HelpHub data (keep users intact, just update them)
        await Request.deleteMany({});
        await Message.deleteMany({});
        await Notification.deleteMany({});
        console.log("Cleared old data.");

        // Create/update seed users
        const hashedPassword = await bcrypt.hash("Test1234", 10);

        const usersData = [
            {
                username: "Ayesha Khan",
                email: "ayesha@helphub.com",
                password: hashedPassword,
                isVerified: true,
                isLoggedIn: false,
                location: "Karachi",
                skills: ["Figma", "UI/UX", "HTML/CSS", "Career Guidance"],
                interests: ["Hackathons", "UI/UX", "Community Building"],
                badges: ["Design Ally", "Fast Responder", "Top Mentor"],
                trustScore: 100,
                contributions: 35,
                role: "Both"
            },
            {
                username: "Hassan Ali",
                email: "hassan@helphub.com",
                password: hashedPassword,
                isVerified: true,
                isLoggedIn: false,
                location: "Lahore",
                skills: ["JavaScript", "React", "Git/GitHub"],
                interests: ["Open Source", "Web Development"],
                badges: ["Code Rescuer", "Bug Hunter"],
                trustScore: 88,
                contributions: 24,
                role: "Helper"
            },
            {
                username: "Sara Noor",
                email: "sara@helphub.com",
                password: hashedPassword,
                isVerified: true,
                isLoggedIn: false,
                location: "Karachi",
                skills: ["Python", "Data Analysis"],
                interests: ["Data Science", "Machine Learning"],
                badges: ["Community Voice"],
                trustScore: 74,
                contributions: 11,
                role: "Requester"
            },
            {
                username: "Ali Ahmed",
                email: "ali@helphub.com",
                password: hashedPassword,
                isVerified: true,
                isLoggedIn: false,
                location: "Islamabad",
                skills: ["Node.js", "MongoDB", "Express"],
                interests: ["Backend Development", "APIs"],
                badges: ["Backend Pro"],
                trustScore: 82,
                contributions: 18,
                role: "Both"
            },
            {
                username: "Zainab Batool",
                email: "zainab@helphub.com",
                password: hashedPassword,
                isVerified: true,
                isLoggedIn: false,
                location: "Islamabad",
                skills: ["SQL", "Backend", "Performance"],
                interests: ["Database Optimization", "System Design"],
                badges: ["Data Expert"],
                trustScore: 70,
                contributions: 8,
                role: "Both"
            }
        ];

        const users = [];
        for (const userData of usersData) {
            let user = await User.findOne({ email: userData.email });
            if (user) {
                // Update existing user with seed data
                Object.assign(user, userData);
                await user.save();
            } else {
                user = await User.create(userData);
            }
            users.push(user);
        }
        console.log(`Seeded ${users.length} users.`);

        const [ayesha, hassan, sara, ali, zainab] = users;

        // Create seed requests
        const requestsData = [
            {
                title: "Need help making my portfolio responsive before demo day",
                description: "My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.",
                tags: ["HTML/CSS", "Responsive", "Portfolio"],
                category: "Web Development",
                urgency: "High",
                status: "Solved",
                author: sara._id,
                helpers: [ayesha._id],
                aiSummary: "Responsive layout issue with a short deadline. Best helpers are frontend mentors comfortable with CSS grids and media queries.",
                aiTags: ["CSS", "Responsive Design", "Layout"]
            },
            {
                title: "Looking for Figma feedback on a volunteer event poster",
                description: "I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.",
                tags: ["Figma", "Poster", "Design Review"],
                category: "Design",
                urgency: "Medium",
                status: "Open",
                author: ayesha._id,
                helpers: [hassan._id],
                aiSummary: "A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.",
                aiTags: ["Design", "Figma", "Visual Feedback"]
            },
            {
                title: "Need mock interview support for internship applications",
                description: "Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.",
                tags: ["Interview Prep", "Career", "Frontend"],
                category: "Career",
                urgency: "Low",
                status: "Solved",
                author: sara._id,
                helpers: [ayesha._id, hassan._id],
                aiSummary: "Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews.",
                aiTags: ["Interview", "Career", "Frontend"]
            },
            {
                title: "JavaScript quiz app debugging help needed",
                description: "Need help with some closure issues in my latest React project logic. The quiz scores are not updating correctly.",
                tags: ["JavaScript", "React", "Debugging"],
                category: "Web Development",
                urgency: "High",
                status: "Open",
                author: ali._id,
                helpers: [],
                aiSummary: "Web Development request with high urgency. Debugging React state management issues in a quiz application.",
                aiTags: ["React", "JavaScript", "Debugging"]
            },
            {
                title: "Database optimization for learning portal",
                description: "Queries are running slow on large datasets. Looking for indexing advice and query optimization tips.",
                tags: ["SQL", "Backend", "Performance"],
                category: "Web Development",
                urgency: "Medium",
                status: "Open",
                author: zainab._id,
                helpers: [ali._id, hassan._id, ayesha._id],
                aiSummary: "Backend performance optimization request. Database indexing and query restructuring recommended.",
                aiTags: ["Database", "SQL", "Performance"]
            }
        ];

        const requests = await Request.insertMany(requestsData);
        console.log(`Seeded ${requests.length} requests.`);

        // Create seed messages
        const messagesData = [
            {
                from: ayesha._id,
                to: sara._id,
                content: "I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.",
                read: true
            },
            {
                from: sara._id,
                to: ayesha._id,
                content: "Thank you so much! I'll send them right away. The tablet view is the worst.",
                read: true
            },
            {
                from: hassan._id,
                to: ayesha._id,
                content: "Your event poster concept is solid. I would tighten the CTA and reduce the background texture.",
                read: false
            },
            {
                from: ali._id,
                to: hassan._id,
                content: "Hey Hassan, can you help me debug my React quiz app? The state updates aren't working properly.",
                read: false
            }
        ];

        const messages = await Message.insertMany(messagesData);
        console.log(`Seeded ${messages.length} messages.`);

        // Create seed notifications
        const notificationsData = [
            { userId: sara._id, title: '"Need help making my portfolio responsive before demo day" was marked as solved', category: "Status" },
            { userId: ayesha._id, title: 'Ayesha Khan offered help on "Need help making my portfolio responsive"', category: "Match" },
            { userId: sara._id, title: 'Your request "Need help making my portfolio responsive" is now live in the community feed', category: "Request" },
            { userId: sara._id, title: '"Need mock interview support for internship applications" was marked as solved', category: "Status" },
            { userId: ayesha._id, title: 'New helper matched to your design poster request', category: "Match" },
            { userId: hassan._id, title: 'Your trust score increased after a solved request', category: "Reputation" },
            { userId: ayesha._id, title: 'Your trust score increased after a solved request', category: "Reputation" },
            { userId: ali._id, title: 'AI Center detected rising demand for JavaScript debugging', category: "Insight" },
            { userId: zainab._id, title: 'Your request "Database optimization for learning portal" is now live', category: "Request" },
            { userId: zainab._id, title: '3 helpers interested in your database optimization request', category: "Match" }
        ];

        const notifications = await Notification.insertMany(notificationsData);
        console.log(`Seeded ${notifications.length} notifications.`);

        console.log("\n✅ Database seeded successfully!");
        console.log("-----------------------------");
        console.log(`Users: ${users.length}`);
        console.log(`Requests: ${requests.length}`);
        console.log(`Messages: ${messages.length}`);
        console.log(`Notifications: ${notifications.length}`);

        process.exit(0);

    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedDB();
