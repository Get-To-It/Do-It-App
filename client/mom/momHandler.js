'use strict';

let Chance = require('chance');
let chance = new Chance();

const { pets, jobs } = require('./activities.js');

const taskGenerate = (socket, payload = null) => {
  if(!payload) {
    payload = {
      creator: 'Mom',
      taskId: chance.guid(),
      task: jobs[chance.d10()-1],
      target: pets[chance.d10()-1],
    };
  };

  console.log(`MOM: Someone needs to ${payload.task} the ${payload.target} now!`);
  socket.emit('create-room', payload.taskId);
  socket.emit('join-room', payload.taskId);
  socket.emit('task-ready', payload);
};

const taskComplete = (socket, payload) => {
  console.log(`MOM: Thank you for completing ${payload.task} the ${payload.target}!`);
  socket.emit('leave-room', payload.taskId);
  socket.emit('accepted', payload);
};

module.exports = {
  taskGenerate,
  taskComplete
};
