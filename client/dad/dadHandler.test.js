'use strict';

// const eventPool = require('../eventPool');
const socket = require('../../socket');
const handler = require('./dadHandler');
//const orderDeliver = require('./handler');
const { taskGenerate, taskComplete } = require('../dadHandler.js');

jest.mock('../../socket.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

console.log = jest.fn();

describe('Dad Handler', () => {
  test('event should emit', () => {
    const payload = {
      creator: 'Dad',
      taskId: '147258369',
      task: 'Vacuum',
      room: 'Living room',
    };

    // refactor this to what?
    orderDeliver(payload);
    expect(socket.emit).toString('in-progress', payload);
  });
});
