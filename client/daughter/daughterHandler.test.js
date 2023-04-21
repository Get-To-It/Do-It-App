'use strict';

const eventPool = require('../../eventPool');
const daughterHandler = require('./daughterHandler');
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
        room: 'Living Room',
      },
    };

    daughterHandler(payload);
    expect(eventPool.emit).toString('in-progress', payload);
  });
});
