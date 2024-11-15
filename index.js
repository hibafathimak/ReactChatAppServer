const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'https://react-chat-app-frontend-two.vercel.app', 
    methods: ['GET', 'POST']
  }
});

app.use(cors({
  origin: 'https://react-chat-app-frontend-two.vercel.app', 
}));

// Socket.io connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages
  socket.on('message', (message) => {
    io.emit('message', message); // Broadcast message to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
