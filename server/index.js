'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');
const eventQueue = new Queue();
// const Chance = require('chance');
// const chance = new Chance();

const server = new Server();
const caps = server.of('/caps');

caps.on('connection', socket => {
  console.log('connected to caps', socket.id);
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

  socket.on('pickup', (payload) => {

    let currentQueue = eventQueue.read('DRIVER');
    if (!currentQueue) {
      let keyOfQueue = eventQueue.store('DRIVER', new Queue());
      currentQueue = eventQueue.read(keyOfQueue);
    }

    currentQueue.store(payload.orderId, payload);
    //console.log('pickup event', payload);
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    //console.log('in-transit event', payload);
    caps.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    let currentQueue = eventQueue.read(payload.store);
    if (!currentQueue) {
      let keyOfQueue = eventQueue.store(payload.store, new Queue());
      currentQueue = eventQueue.read(keyOfQueue);
    }

    currentQueue.store(payload.orderId, payload);
    //console.log('delivered event', payload);
    caps.emit('delivered', payload);
  });

  socket.on('received', (payload) => {
    let id = payload.queueId ? payload.queueId : payload.store;
    let currentQueue = eventQueue.read(id);
    if (!currentQueue) {
      throw new Error('Cannot find queue for store: ' + payload.store);
    }

    let message = currentQueue.remove(payload.orderId);
    caps.emit('received', message);
  });

  socket.on('getAll', (payload) => {
    let id = payload.queueId ? payload.queueId : payload.store;
    let currentQueue = eventQueue.read(id);
    if (currentQueue && currentQueue.data) {
      Object.keys(currentQueue.data).forEach((orderId) => {
        socket.emit('pickup', currentQueue.read(orderId));
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
