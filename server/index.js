'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3003;
const Queue = require('./lib/queue');
const eventQueue = new Queue();
// const Chance = require('chance');
// const chance = new Chance();

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

  socket.on('join', room => {
    console.log('joined room', room);
    socket.join(room);
  });

  socket.on('task-ready', (payload) => {

    let currentQueue = eventQueue.read('SON');
    if (!currentQueue) {
      let keyOfQueue = eventQueue.store('SON', new Queue());
      currentQueue = eventQueue.read(keyOfQueue);
    }

    currentQueue.store(payload.taskId, payload);
    //console.log('pickup event', payload);
    burden.emit('task-ready', payload);
  });

  socket.on('task-ready', (payload) => {

    let currentQueue = eventQueue.read('DAUGHTER');
    if (!currentQueue) {
      let keyOfQueue = eventQueue.store('DAUGHTER', new Queue());
      currentQueue = eventQueue.read(keyOfQueue);
    }

    currentQueue.store(payload.taskId, payload);
    //console.log('pickup event', payload);
    burden.emit('task-ready', payload);
  });

  socket.on('in-progress', (payload) => {
    //console.log('in-transit event', payload);
    burden.emit('in-progress', payload);
  });

  socket.on('completed', (payload) => {
    let currentQueue = eventQueue.read(payload.creator);
    if (!currentQueue) {
      let keyOfQueue = eventQueue.store(payload.creator, new Queue());
      currentQueue = eventQueue.read(keyOfQueue);
    }

    currentQueue.store(payload.taskId, payload);
    //console.log('delivered event', payload);
    burden.emit('completed', payload);
  });

  socket.on('accepted', (payload) => {
    console.log('accepted');
    let id = payload.queueId ? payload.queueId : payload.creator;
    let currentQueue = eventQueue.read(id);
    if (!currentQueue) {
      throw new Error('Cannot find queue for store: ' + payload.creator);
    }

    let message = currentQueue.remove(payload.taskId);
    burden.emit('received', message);
  });

  socket.on('getAll', (payload) => {
    let id = payload.queueId ? payload.queueId : payload.creator;
    let currentQueue = eventQueue.read(id);
    if (currentQueue && currentQueue.data) {
      Object.keys(currentQueue.data).forEach((taskId) => {
        socket.emit('pickup', currentQueue.read(taskId));
      });
    }
  });

  // setInterval(() => {
  //   socket.broadcast.emit('VENDOR', chance.company());
  // }, 5000);
  // });

  // emit the VENDOR event when server receives a connection
  // server.on('connection', socket => {
  //   console.log('####connected to server', socket.id);
});

server.listen(PORT);
console.log('I am BATMAN!');
