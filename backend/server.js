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
import messageRoutes from './routes/messages.js';
import uploadRoutes from './routes/upload.js';
import wishlistRoutes from './routes/wishlist.js';
import reviewRoutes from './routes/reviews.js';
import reportRoutes from './routes/reports.js';
import adminRoutes from './routes/admin.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
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
  console.log('User connected:', socket.userId);
  
  // Add user to online users
  onlineUsers.set(socket.userId, {
    socketId: socket.id,
    userId: socket.userId,
    lastSeen: new Date()
  });
  
  // Broadcast updated online users list
  io.emit('onlineUsers', Array.from(onlineUsers.values()));

  // Join user's personal room
  socket.join(socket.userId);

  // Handle joining conversation rooms
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.userId} joined room ${roomId}`);
  });

  // Handle leaving conversation rooms
  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.userId} left room ${roomId}`);
  });

  // Handle sending messages
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

    // Emit to room participants
    io.to(roomId).emit('newMessage', message);
    
    // Emit to receiver's personal room for notifications
    io.to(receiverId).emit('messageNotification', {
      senderId: socket.userId,
      content: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
      productId
    });
  });

  // Handle user typing
  socket.on('typing', ({ receiverId, isTyping }) => {
    socket.to(receiverId).emit('userTyping', {
      userId: socket.userId,
      isTyping
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.userId);
    onlineUsers.delete(socket.userId);
    io.emit('onlineUsers', Array.from(onlineUsers.values()));
  });
});

// Make io accessible to routes
app.set('io', io);

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

export default app;