import { User } from "../models/userModel.js";


// Get leaderboard - top users sorted by trust score and contributions
export const getLeaderboard = async (req, res) => {
    try {
        const users = await User.find({ isVerified: true })
            .select("username skills trustScore contributions badges location")
            .sort({ trustScore: -1, contributions: -1 })
            .limit(20);

        const rankings = users.map((user, index) => ({
            id: user._id,
            rank: index + 1,
            name: user.username,
            skills: user.skills.join(", ") || "No skills listed",
            trustScore: `${user.trustScore}%`,
            contributions: `${user.contributions} contributions`,
            badges: user.badges,
            location: user.location || "Remote",
            initials: user.username.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
        }));

        return res.status(200).send({
            success: true,
            count: rankings.length,
            data: rankings
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// Get badge achievements with progress
export const getBadges = async (req, res) => {
    try {
        const users = await User.find({ isVerified: true, badges: { $exists: true, $ne: [] } })
            .select("username badges trustScore contributions")
            .sort({ trustScore: -1 })
            .limit(20);

        const achievements = users.map(user => ({
            id: user._id,
            name: user.username,
            badges: user.badges.join(" • ") || "No badges yet",
            progress: Math.min(user.trustScore, 100)
        }));

        return res.status(200).send({
            success: true,
            count: achievements.length,
            data: achievements
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
