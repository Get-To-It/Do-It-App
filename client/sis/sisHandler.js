'use strict';

module.exports = (socket, payload) => {
  console.log(`SIS: Agreed to ${payload.task} the ${payload.target}!`);

  setTimeout(() => {
    console.log(`SIS: Working on ${payload.task} the ${payload.target}!`);
    socket.emit('in-progress', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`SIS: Completed ${payload.task} the ${payload.target}!`);
    socket.emit('completed', payload);
    socket.emit('leave-room', payload.taskId);
  }, 1000);
};
