'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3003;
const Queue = require('./lib/queue');
const eventQueue = new Queue();

const server = new Server();
const burden = server.of('/burden');

burden.on('connection', socket => {
  console.log('connected to burden', socket.id);
  // socket.onAny to check and see all events
  socket.onAny((event, payload) => {
    const time = new Date().toISOString();
    console.log({
      event,
      time,
      payload,
    });
  });

  socket.on('join-room', room => {
    socket.join(room);
  });

  socket.on('leave-room', room => {
    socket.leave(room);
  });

  socket.on('task-ready', (payload) => {
    let currentQueue = eventQueue.read('KIDS');
    if (!currentQueue) {
      let keyOfQueue = eventQueue.store('KIDS', new Queue());
      currentQueue = eventQueue.read(keyOfQueue);
    }
    currentQueue.store(payload.taskId, payload);
  });

  socket.on('in-progress', (payload) => {
    socket.to(payload.taskId).emit('in-progress', payload);
  });

  socket.on('completed', (payload) => {
    socket.to(payload.taskId).emit('completed', payload);
  });

  socket.on('accepted', (payload) => {
    // console.log('accepted');
    let id = payload.taskId;
    let currentQueue = eventQueue.read('KIDS');
    if (!currentQueue) {
      throw new Error('Cannot find queue for KIDS');
    }
    let message = currentQueue.remove(payload.taskId);
    burden.emit('received', message);
  });

  socket.on('get-all', (payload) => {
    let id = payload.queueId ? payload.queueId : 'KIDS';
    let currentQueue = eventQueue.read(id);
    // console.log(currentQueue.data);
    if (currentQueue && currentQueue.data) {
      Object.keys(currentQueue.data).forEach((taskId) => {
        socket.emit('task-ready', currentQueue.read(taskId));
      });
    }
  });

});

server.listen(PORT);
console.log('I am BATMAN!');
