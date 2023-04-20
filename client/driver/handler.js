'use strict';

// const eventPool = require('../eventPool');
const {io} = require('socket.io-client');
const socket = io.connect('http://localhost:3003/caps');

module.exports = (payload) => {
  console.log(`SON: Agreed to ${payload.task} the ${payload.room}!`);
  // socket.emit('task-ready', payload);

  setTimeout(() => {
    console.log(`SON: Working on ${payload.task} the ${payload.room}!`);
    socket.emit('in-progress', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`SON: Completed ${payload.task} the ${payload.room}`);
    socket.emit('completed', payload);
  }, 1000);
};
