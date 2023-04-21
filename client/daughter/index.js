'use strict';

const {io} = require('socket.io-client');
const daughterHandler = require('./daughterHandler');
const socket = io.connect('http://localhost:3003/burden');

socket.emit('getAll', {queueId: 'DAUGHTER'});

socket.on('task-ready', (payload) => {
  setTimeout(() => {
    daughterHandler(payload);
  }, 1000);
});
