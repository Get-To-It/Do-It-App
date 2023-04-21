'use strict';

const socket = require('../../socket');
const eventPool = require('../../eventPool');
const { taskGenerate, taskComplete } = require('./momHandler');

jest.mock('../../socket.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

jest.useFakeTimers();

console.log = jest.fn();

describe('test mom', () => {

  test('mom should leave room and report accepted after task complete', () => {
    const payload = {
      creator: 'Mom',
      taskId: '147258369',
      task: 'walk',
      target: 'dog',
    };
    taskComplete(socket, payload);
    expect(eventPool.emit).toString('leave-room', payload.taskId);
    expect(eventPool.emit).toString('accepted', payload);
  });

});
