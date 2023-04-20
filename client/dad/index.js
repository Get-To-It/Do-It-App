'use strict';

// const eventPool = require('../eventPool');
const handler = require('./dadHandler');
const {io} = require('socket.io-client');
const { taskGenerate, taskComplete } = require('./dadHandler.js');
const socket = io.connect ('http://localhost:3003/caps');

socket.emit('getAll', { store: '1-800-flowers' });

setInterval(() => {
  taskGenerate(socket);
}, 60000);

socket.on ('completed', payload => {
  taskComplete(payload);
  socket.emit('accepted', payload);
});


// socket.on('VENDOR', (deliveryCompany) => {
//   setTimeout(() => {
//     handler(deliveryCompany);
//   }, 1000);
// });

// eventPool.on('VENDOR', (deliveryCompany) => {
//   setTimeout(() => {
//     handler(deliveryCompany);
//   }, 5000);
// });
