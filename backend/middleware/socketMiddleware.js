export const socketAuth = (socket, next) => {

  socket.userId = socket.handshake.auth.userId || 'guest';
  next();
};
