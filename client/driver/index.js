'use strict';

//const eventPool = require('../eventPool');
const {io} = require('socket.io-client');
const handler = require('./handler');
const socket = io.connect('http://localhost:3003/caps');

socket.emit('getAll', {queueId: 'SON'});

socket.on('task-ready', (payload) => {
  setTimeout(() => {
    handler(payload);
  }, 1000);
});

// eventPool.on('pickup', (payload) => {
//   console.log('DRIVER : Order has been picked up');
//   setTimeout(() => {
//     handler(payload);
//   }, 5000);
// });
