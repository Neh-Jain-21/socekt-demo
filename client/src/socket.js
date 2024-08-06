import { io } from 'socket.io-client';

const initializeSocket = (user) => {
  return io('http://localhost:3000/', {
    ackTimeout: 10000,
    retries: 3,
    transports: ['websocket'],
    query: { user },
  });
};

export default initializeSocket;
