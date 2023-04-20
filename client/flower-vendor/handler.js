'use strict';

let Chance = require('chance');
let chance = new Chance();

const orderGenerate = (socket, payload = null) => {
  if(!payload){
    payload = {
      store: '1-800-flowers',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }

  socket.emit('join', payload.store);
  console.log('vendor: order ready for pickup');
  socket.emit('pickup', payload);
};

const orderDeliver = (payload) => {
  console.log('vendor: Thank you! Package was delivered', payload.orderId);
};

module.exports = { orderGenerate, orderDeliver };
