import MessageModel from "../models/MessageModel.js";

// Add a new message to a chat
export const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });

  try {
    const result = await message.save();
    res.json({ err: false, result });
  } catch (error) {
    res.json({ err: true });
  }
};

// Get messages for a specific chat
export const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const result = await MessageModel.find({ chatId });
    res.json({ err: false, result });
  } catch (error) {
    res.json({ err: true });
  }
};
