'use strict';

const eventPool = require('../../eventPool.js');
const socket = require('../../socket');
const momHandler = require('./momHandler');
const { taskGenerate, taskComplete } = require('./momHandler.js');

jest.mock('../../socket.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

console.log = jest.fn();

describe('Mom Handler', () => {
  test('event should emit', () => {
    const payload = {
      creator: 'Mom',
      taskId: '147258369',
      task: 'walk',
      target: 'dog',
    };

    taskComplete(payload);
    expect(socket.emit).toString('accepted', payload);
  });
});
