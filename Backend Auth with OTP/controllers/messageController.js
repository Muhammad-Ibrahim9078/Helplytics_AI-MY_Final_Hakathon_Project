import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import { Notification } from "../models/notificationModel.js";


// Send a message
export const sendMessage = async (req, res) => {
    try {
        const fromUserId = req.userId;
        const { to, content, requestId } = req.body;

        if (!to || !content) {
            return res.status(400).send({
                success: false,
                message: "Recipient and message content are required"
            });
        }

        // Find recipient by username or ID
        let toUser;
        if (to.match(/^[0-9a-fA-F]{24}$/)) {
            toUser = await User.findById(to);
        } else {
            toUser = await User.findOne({ username: to });
        }

        if (!toUser) {
            return res.status(404).send({
                success: false,
                message: "Recipient not found"
            });
        }

        const message = await Message.create({
            from: fromUserId,
            to: toUser._id,
            content,
            requestId: requestId || null
        });

        // Create notification for recipient
        const sender = await User.findById(fromUserId);
        await Notification.create({
            userId: toUser._id,
            title: `New message from ${sender.username}`,
            category: "Match"
        });

        const populatedMessage = await Message.findById(message._id)
            .populate("from", "username email")
            .populate("to", "username email");

        return res.status(201).send({
            success: true,
            message: "Message sent successfully",
            data: populatedMessage
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// Get all conversations for logged-in user (latest message per conversation partner)
export const getConversations = async (req, res) => {
    try {
        const userId = req.userId;

        const messages = await Message.find({
            $or: [{ from: userId }, { to: userId }]
        })
            .populate("from", "username email")
            .populate("to", "username email")
            .sort({ createdAt: -1 });

        // Group by conversation partner, take latest message
        const conversationMap = new Map();
        for (const msg of messages) {
            // Safety check: skip orphaned messages where users are deleted
            if (!msg.from || !msg.to) continue;

            const isFromMe = msg.from._id.toString() === userId.toString();
            const partnerId = isFromMe ? msg.to._id.toString() : msg.from._id.toString();
            const partnerObj = isFromMe ? msg.to : msg.from;

            if (!conversationMap.has(partnerId)) {
                conversationMap.set(partnerId, {
                    id: msg._id,
                    from: msg.from,
                    to: msg.to,
                    partner: partnerObj || { username: "Chat Partner", _id: partnerId },
                    preview: msg.content,
                    time: msg.createdAt,
                    read: msg.read
                });
            }
        }

        const conversations = Array.from(conversationMap.values());

        return res.status(200).send({
            success: true,
            count: conversations.length,
            data: conversations
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// Get all messages between current user and another user
export const getMessagesWith = async (req, res) => {
    try {
        const userId = req.userId;
        const { partnerId } = req.params;

        const messages = await Message.find({
            $or: [
                { from: userId, to: partnerId },
                { from: partnerId, to: userId }
            ]
        })
            .populate("from", "username email")
            .populate("to", "username email")
            .sort({ createdAt: 1 });

        // Mark messages from partner as read
        await Message.updateMany(
            { from: partnerId, to: userId, read: false },
            { read: true }
        );

        return res.status(200).send({
            success: true,
            count: messages.length,
            data: messages
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
