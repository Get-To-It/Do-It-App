'use strict';

// const eventPool = require('../eventPool');
const {io} = require('socket.io-client');
const socket = io.connect ('http://localhost:3003/caps');

let Chance = require('chance');
let chance = new Chance();

const orderGenerate = (socket, payload = null) => {
  if(!payload) {
    const payload = {
      deliveryCompany: deliveryCompany,
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  };

  console.log('VENDOR: Thank you for picking up my order');

  socket.emit('join', payload.deliveryCompany);
  socket.emit('pickup', payload);
};

const orderDeliver = payload => {
  console.log('VENDOR: Thank you for delivering ', payload.orderId);

  process.exit();
};

// module.exports = (deliveryCompany) => {

//   const payload = {
//     deliveryCompany: deliveryCompany,
//     orderId: chance.guid(),
//     customer: chance.name(),
//     address: chance.address(),
//   };

//   console.log('VENDOR: Thank you for delivering my order');
//   socket.emit('pickup', payload);
// };
