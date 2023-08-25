import express from 'express';
import { addMessage, getMessages } from '../controller/messageController.js';


const router = express.Router();

// Route to add a new message
router.post('/', addMessage);

// Route to get messages by chat ID
router.get('/:chatId', getMessages);

export default router;
