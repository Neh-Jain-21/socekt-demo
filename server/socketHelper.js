const { Server } = require('socket.io');

const connectedClients = {};

const socketHelper = (httpServer) => {
  const io = new Server(httpServer, { transports: ['websocket'] });

  io.on('connection', (socket) => {
    const user = socket.handshake.query.user;

    connectedClients[user] = socket.id;

    socket.on('sendMessage', (data) => {
      const usersIds = Object.keys(connectedClients).map((key) => connectedClients[key]);

      socket.emit('receiveMessage', data);
      socket.to(usersIds).emit('receiveMessage', data);
    });

    socket.on('disconnect', (reason) => {
      console.log(reason);
      delete connectedClients[user];
    });
  });
};

module.exports = socketHelper;
