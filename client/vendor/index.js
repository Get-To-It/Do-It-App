'use strict';

// const eventPool = require('../eventPool');
const handler = require('./handler');
const {io} = require('socket.io-client');
const { orderGenerate, orderDeliver } = require('../flower-vendor/handler');
const socket = io.connect ('http://localhost:3003/caps');

socket.emit('getAll', { store: '1-800-flowers' });

setInterval(() => {
  orderGenerate(socket);
}, 5000);

socket.on ('delivered', payload => {
  orderDeliver(payload);
  socket.emit('received', payload);
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
