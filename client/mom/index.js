'use strict';

const { io } = require('socket.io-client');
const { taskGenerate, taskComplete } = require('./momHandler.js');
const socket = io.connect('http://localhost:3003/burden');

setInterval(() => {
  taskGenerate(socket);
}, 15000);

socket.on('completed', (payload) => {
  taskComplete(socket, payload);
});
