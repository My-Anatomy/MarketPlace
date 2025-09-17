import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import connectDB from './config/database.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { socketAuth } from './middleware/socketMiddleware.js';

// Route imports
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/categories.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Store online users
const onlineUsers = new Map();

// Socket.io connection handling
io.use(socketAuth);
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.userId);

  onlineUsers.set(socket.userId, {
    socketId: socket.id,
    userId: socket.userId,
    lastSeen: new Date()
  });

  io.emit('onlineUsers', Array.from(onlineUsers.values()));
  socket.join(socket.userId);

  socket.on('joinRoom', (roomId) => socket.join(roomId));
  socket.on('leaveRoom', (roomId) => socket.leave(roomId));

  socket.on('sendMessage', (messageData) => {
    const { receiverId, productId, content } = messageData;
    const roomId = [socket.userId, receiverId].sort().join('-');

    const message = {
      senderId: socket.userId,
      receiverId,
      productId,
      content,
      timestamp: new Date(),
      read: false
    };

    io.to(roomId).emit('newMessage', message);
    io.to(receiverId).emit('messageNotification', {
      senderId: socket.userId,
      content: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
      productId
    });
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.userId);
    onlineUsers.delete(socket.userId);
    io.emit('onlineUsers', Array.from(onlineUsers.values()));
  });
});

app.set('io', io);

// Security middleware
app.use(helmet());
app.use(compression());

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, try again later.'
});
app.use('/api', limiter);

// Body parsing & logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy', uptime: process.uptime() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;
