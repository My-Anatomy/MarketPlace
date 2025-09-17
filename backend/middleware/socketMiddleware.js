export const socketAuth = (socket, next) => {
  // Normally verify JWT here, for now just attach dummy user
  socket.userId = socket.handshake.auth.userId || 'guest';
  next();
};
