'use strict';

const socket = require('../../socket');
const eventPool = require('../../eventPool');
const sisHandler = require('./sisHandler');

jest.mock('../../eventPool', () => {
  return {
    emit: jest.fn(),
  };
});

jest.useFakeTimers();

console.log = jest.fn();

describe('test sis', () => {

  test('event should emit', () => {
    const payload = {
        creator: 'Mom',
        taskId: '147258369',
        task: 'walk',
        target: 'dog',
      };
    sisHandler(socket, payload);
    jest.advanceTimersByTime(1000);
    expect(eventPool.emit).toString('in-progress', payload);
  });

});
