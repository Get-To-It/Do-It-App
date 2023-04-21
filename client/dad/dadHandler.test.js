'use strict';

const socket = require('../../socket');
const eventPool = require('../../eventPool');
const { taskGenerate, taskComplete } = require('./dadHandler');

jest.mock('../../socket.js', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

console.log = jest.fn();

describe('test dad', () => {

  test('dad should leave room and report accepted after task complete', () => {
    const payload = {
      creator: 'Dad',
      taskId: '147258369',
      task: 'vacuum',
      target: 'living-room',
    };
    taskComplete(socket, payload);
    expect(eventPool.emit).toString('leave-room', payload.taskId);
    expect(eventPool.emit).toString('accepted', payload);
  });

});
