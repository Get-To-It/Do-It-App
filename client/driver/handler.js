'use strict';

// const eventPool = require('../eventPool');
const {io} = require('socket.io-client');
const socket = io.connect('http://localhost:3003/caps');

module.exports = (payload) => {
  console.log('DRIVER: Picked up order', payload.orderId);
  socket.emit('pickup', payload);

  setTimeout(() => {
    console.log('DRIVER: In transit to destination', payload.orderId);
    socket.emit('in-transit', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered, ${payload.orderId}`);
    socket.emit('delivered', payload.orderId);
  }, 1000);
};
