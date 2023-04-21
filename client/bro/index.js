'use strict';

const { io } = require('socket.io-client');
const broHandler = require('./broHandler.js');
const socket = io.connect('http://localhost:3003/burden');

setInterval(() => {
  socket.emit('get-all', { queueId: 'KIDS' });
  }, 7777);
  
socket.on('task-ready', (payload) => {
  if (payload.creator === 'Dad') {
    socket.emit('join-room', payload.taskId);
    setTimeout(() => {
      broHandler(socket, payload);
    }, 1000);
  }
});
