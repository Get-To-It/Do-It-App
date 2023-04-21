'use strict';

module.exports = (socket, payload) => {
  console.log(`BRO: Agreed to ${payload.task} the ${payload.target}!`);

  setTimeout(() => {
    console.log(`BRO: Working on ${payload.task} the ${payload.target}!`);
    socket.emit('in-progress', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`BRO: Completed ${payload.task} the ${payload.target}!`);
    socket.emit('completed', payload);
    socket.emit('leave-room', payload.taskId);
  }, 1000);
};
