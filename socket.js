'use strict';

const {io} = require('socket.io-client');
const socket =  io.connect('http://localhost:3003/burden');

module.exports = socket;
