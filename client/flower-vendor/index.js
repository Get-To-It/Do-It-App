'use strict';

const {io} = require('socket.io-client');
const socket = io.connect('http://localhost:3003/caps');
const { orderDeliver } = require('./handler');

socket.emit('getAll', { store: '1-800-flowers' });

socket.on('delivered', (payload) => {
  orderDeliver(payload);
  socket.emit('received', payload);
});
