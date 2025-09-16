import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user, token } = useAuth();

  useEffect(() => {
    if (user && token) {
      const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
        auth: {
          token
        }
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
        setSocket(newSocket);
      });

      newSocket.on('onlineUsers', (users) => {
        setOnlineUsers(users);
      });

      newSocket.on('newMessage', (message) => {
        setMessages(prev => [...prev, message]);
      });

      return () => {
        newSocket.close();
        setSocket(null);
      };
    }
  }, [user, token]);

  const sendMessage = (receiverId, productId, content) => {
    if (socket) {
      socket.emit('sendMessage', {
        receiverId,
        productId,
        content
      });
    }
  };

  const joinRoom = (roomId) => {
    if (socket) {
      socket.emit('joinRoom', roomId);
    }
  };

  const leaveRoom = (roomId) => {
    if (socket) {
      socket.emit('leaveRoom', roomId);
    }
  };

  return (
    <SocketContext.Provider value={{
      socket,
      onlineUsers,
      messages,
      sendMessage,
      joinRoom,
      leaveRoom
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};