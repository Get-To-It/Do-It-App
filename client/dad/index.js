'use strict';

const { io } = require('socket.io-client');
const { taskGenerate, taskComplete } = require('./dadHandler.js');
const socket = io.connect('http://localhost:3003/burden');

setInterval(() => {
  taskGenerate(socket);
}, 10000);

socket.on('completed', (payload) => {
  taskComplete(socket, payload);
});
