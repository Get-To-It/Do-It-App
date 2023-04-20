'use strict';

const {io} = require('socket.io-client');
const socket =  io.connect('http://localhost:3003/caps');

module.exports = socket;
