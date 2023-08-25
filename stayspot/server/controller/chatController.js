import ChatModel from "../models/ChatModel.js";
import MessageModel from "../models/MessageModel.js";

// Create a new chat
export const createChat = async (req, res) => {
    const { userId, hostId } = req.body;

    const existingChat = await ChatModel.findOne({ userId, hostId });

    if (existingChat) {
        return res.json({ err: false, message: 'Chat already exists' });
    }

    const newChat = new ChatModel({
        userId,
        hostId,
    });

    try {
        const result = await newChat.save();
        res.json({ err: false, result });
    } catch (error) {
        console.log(error);
        res.json({ err: true });
    }
};

// Get chats for a user
export const userChats = async (req, res) => {
    try {
        const chat = await ChatModel.find({
            userId: req.params.userId,
        }).populate('hostId');

        const messages = await MessageModel.aggregate([
            {
                $group: {
                    _id: "$chatId", 
                    lastMessage: { $last: "$text" }
                }
            }
        ]);

        let lastMessage = {};
        messages.forEach((item) => {
            lastMessage[item._id] = item.lastMessage;
        });

        res.json({ err: false, chat, lastMessage });
    } catch (error) {
        console.log(error);
        res.json({ err: true });
    }
};

// Get chats for a host
export const hostChats = async (req, res) => {
    try {
        const chat = await ChatModel.find({
            hostId: req.params.hostId,
        }).populate('userId');

        const messages = await MessageModel.aggregate([
            {
                $group: {
                    _id: "$chatId",
                    lastMessage: { $last: "$text" }
                }
            }
        ]);

        let lastMessage = {};
        messages.forEach((item) => {
            lastMessage[item._id] = item.lastMessage;
        });

        res.json({ err: false, chat, lastMessage });
    } catch (error) {
        res.json({ err: true });
    }
};

// Find or create a chat
export const findChat = async (req, res) => {
    try {
        let chat = await ChatModel.findOne({
            userId: req.params.userId,
            hostId: req.params.hostId
        }).populate('hostId').populate('userId');

        if (!chat) {
            chat = await ChatModel.findOneAndUpdate({
                userId: req.params.userId,
                hostId: req.params.hostId
            },{
                $set:{
                    userId: req.params.userId,
                    hostId: req.params.hostId
                }
            },{upsert:true}
            ).populate('hostId').populate('userId');
        }

        res.json({ err: false, chat });
    } catch (error) {
        console.log(error);
        res.json({ err: true, message:"server error" });
    }
};
