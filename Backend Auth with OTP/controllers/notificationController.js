import { Notification } from "../models/notificationModel.js";


// Get all notifications for the logged-in user
export const getNotifications = async (req, res) => {
    try {
        const userId = req.userId;

        const notifications = await Notification.find({ userId })
            .sort({ createdAt: -1 })
            .limit(50);

        return res.status(200).send({
            success: true,
            count: notifications.length,
            data: notifications
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// Mark a single notification as read
export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findByIdAndUpdate(
            id,
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).send({
                success: false,
                message: "Notification not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Notification marked as read",
            data: notification
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
    try {
        const userId = req.userId;

        await Notification.updateMany(
            { userId, read: false },
            { read: true }
        );

        return res.status(200).send({
            success: true,
            message: "All notifications marked as read"
        });

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};
