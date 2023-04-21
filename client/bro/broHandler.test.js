'use strict';

const socket = require('../../socket');
const eventPool = require('../../eventPool');
const broHandler = require('./broHandler');

jest.mock('../../eventPool', () => {
  return {
    emit: jest.fn(),
    socket: jest.fn()
  };
});

jest.useFakeTimers();

console.log = jest.fn();

describe('test bro', () => {

  test('bro should agree to task and report in progress', () => {
    const payload = {
        creator: 'Dad',
        taskId: '147258369',
        task: 'acuum',
        target: 'living-room',
      };
    broHandler(socket, payload);
    jest.advanceTimersByTime(1000);
    expect(eventPool.emit).toString('in-progress', payload)
    jest.advanceTimersByTime(1000);
  });

});
