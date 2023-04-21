const {io} = require('socket.io-client');
const socket = io.connect('http://localhost:3003/burden');

module.exports = (payload) => {
  console.log(`DAUGHTER: Agreed to ${payload.task} the ${payload.room}!`);

  setTimeout(() => {
    console.log(`DAUGHTER: Working on ${payload.task} the ${payload.room}!`);
    socket.emit('in-progress', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`DAUGHTER: Completed ${payload.task} the ${payload.room}`);
    socket.emit('completed', payload);
  }, 1000);
}
