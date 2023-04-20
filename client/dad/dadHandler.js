'use strict';

// const eventPool = require('../eventPool');
// const {io} = require('socket.io-client');
// const socket = io.connect ('http://localhost:3003/burden');

let Chance = require('chance');
let chance = new Chance();

const { rooms, tasks } = require('./chores.js');

const taskGenerate = (socket, payload = null) => {
  if(!payload) {
    payload = {
      creator: "Dad",
      taskId: chance.guid(),
      task: tasks[chance.d10()],
      room: rooms[chance.d10()],
    };
  };

  console.log(`DAD: Someone needs to ${payload.task} the ${payload.room} now!`);
  // console.log(`DAD: Someone needs to cleanup now!!!`);

  socket.emit('join', payload.taskId);
  socket.emit('task-ready', payload);
};

const taskComplete = payload => {
  console.log(`DAD: Thank you for completing ${payload.task} the ${payload.room}!`);

  process.exit();
};


module.exports = {
  taskGenerate,
  taskComplete
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
