import express from "express";
import 'dotenv/config'
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js"
import chatbotRoute from "./routes/chatbotRoute.js"
import uploadRoute from "./routes/uploadRoute.js"
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

app.use('/user', userRoute);
app.use('/chatbot', chatbotRoute);
app.use('/upload', uploadRoute);

app.listen(PORT, () =>{
    connectDB();
    console.log(`Server is Listening at port ${PORT}`);
});