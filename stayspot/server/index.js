// Import necessary modules
import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dbConnect from './config/dbConnect.js'; 
import socketConnect from './config/socket.io.js'; 

// Import routers
import chatRouter from './routes/chatRouter.js';
import hostChatRouter from './routes/hostChatRouter.js';
import messageRouter from './routes/messageRouter.js';
import userRouter from './routes/userRouter.js';
import hostRouter from './routes/hostRouter.js';
import adminRouter from './routes/adminRouter.js';

// Create an Express app
const app = express();
const server = createServer(app);

// Initialize Socket.IO with CORS options
const io = new Server(server, {
  cors: {
    origin: [process.env.ORIGIN], 
  },
});

// Store active users in an object
let activeUsers = {};

// Pass the activeUsers object to the socketConnect function
socketConnect(io, activeUsers);

// Middleware
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cors({ origin: [process.env.ORIGIN], credentials: true }));
app.use(cookieParser());

// Route handling
app.use('/', userRouter);
app.use('/host', hostRouter);
app.use('/admin', adminRouter);
app.use('/chat', chatRouter);
app.use('/host/chat', hostChatRouter);
app.use('/message', messageRouter);
app.use('/host/message/', messageRouter);

// Connect to the database
dbConnect();

// Start the server
server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
