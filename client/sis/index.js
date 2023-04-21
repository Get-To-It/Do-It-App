'use strict';

const { io } = require('socket.io-client');
const sisHandler = require('./sisHandler');
const socket = io.connect('http://localhost:3003/burden');

setInterval(() => {
socket.emit('get-all', { queueId: 'KIDS' });
}, 5000);

socket.on('task-ready', (payload) => {
  if (payload.creator === 'Mom') {
    socket.emit('join-room', payload.taskId);
    setTimeout(() => {
      sisHandler(socket, payload);
    }, 1000);
  }
});
