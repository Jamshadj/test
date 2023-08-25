import express from 'express';
import { createChat, findChat, userChats } from '../controller/chatController.js';

// Create an Express router instance
const router = express.Router();

// Endpoint to create a new chat
router.post('/', createChat);

// Endpoint to get all chats of a specific user
router.get('/:userId', userChats);

// Endpoint to find a chat between a user and a host
router.get('/find/:userId/:hostId', findChat);

export default router;
