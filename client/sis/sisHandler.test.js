'use strict';

const eventPool = require('../../eventPool.js');
const sisHandler = require('./sisHandler.js');
jest.mock('../../eventPool', () => {
  return {
    emit: jest.fn(),
  };
});

console.log = jest.fn();

describe('pick-up event', () => {
  test('event should emit', () => {
    const payload = {
      event: 'pickup',
      time: new Date(),
      payload: {
        creator: 'Dad',
        taskId: '147258369',
        task: 'Vacuum',
        target: 'Living Room',
      },
    };

    sisHandler(payload);
    expect(eventPool.emit).toString('in-progress', payload);
  });
});
