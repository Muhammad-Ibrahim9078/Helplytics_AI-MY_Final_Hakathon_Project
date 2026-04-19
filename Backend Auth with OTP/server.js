import express from "express";
import 'dotenv/config'
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js"
import chatbotRoute from "./routes/chatbotRoute.js"
import uploadRoute from "./routes/uploadRoute.js"
import requestRoute from "./routes/requestRoute.js"
import messageRoute from "./routes/messageRoute.js"
import notificationRoute from "./routes/notificationRoute.js"
import leaderboardRoute from "./routes/leaderboardRoute.js"
import aiCenterRoute from "./routes/aiCenterRoute.js"
import cors from "cors"
import dns from "dns";

// Custom DNS servers set karna
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Optional: IPv4 priority
dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173", "https://ib-email-auth-system.netlify.app"],
    credentials: true
}));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Existing routes
app.use('/user', userRoute);
app.use('/chatbot', chatbotRoute);
app.use('/upload', uploadRoute);

// New HelpHub routes
app.use('/api/requests', requestRoute);
app.use('/api/messages', messageRoute);
app.use('/api/notifications', notificationRoute);
app.use('/api/leaderboard', leaderboardRoute);
app.use('/api/ai-center', aiCenterRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is Listening at port ${PORT}`);
});