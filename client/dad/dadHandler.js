'use strict';

let Chance = require('chance');
let chance = new Chance();

const { tasks, rooms } = require('./chores.js');

const taskGenerate = (socket, payload = null) => {
  if(!payload) {
    payload = {
      creator: 'Dad',
      taskId: chance.guid(),
      task: tasks[chance.d10()-1],
      target: rooms[chance.d10()-1],
    };
  };

  console.log(`DAD: Someone needs to ${payload.task} the ${payload.target} now!`);
  socket.emit('create-room', payload.taskId);
  socket.emit('join-room', payload.taskId);
  socket.emit('task-ready', payload);
};

const taskComplete = (socket, payload) => {
  console.log(`DAD: Thank you for completing ${payload.task} the ${payload.target}!`);
  socket.emit('leave-room', payload.taskId);
  socket.emit('accepted', payload);
};

module.exports = {
  taskGenerate,
  taskComplete
};
